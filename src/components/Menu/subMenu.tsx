import React, { FunctionComponentElement, FC, useState, useContext, useMemo, useCallback, useRef } from 'react'
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';
import Transition from '../Transition/transition';
import Icon from '../Icon/icon';


export interface SubMenuProps {
    /** 当前是否被选中的标识 */
    index?: string;
    /** SubMenu必备的标题 */
    title: string;
    className?: string;
}

export const SubMenu: FC<SubMenuProps> = ({
    index,
    title,
    children,
    className
}) => {
    const context = useContext(MenuContext);
    // 判断是否默认打开
    const isOpened = useMemo(() => (index && context.mode === 'vertical') ? context.defaultOpenSubMenus?.includes(index) : false, [index, context]);
    const [menuOpen, setOpen] = useState<boolean>(isOpened!);
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical',
    });
    // 渲染子节点, 子节点一定是MenuItem
    const renderChildren = useMemo(() => {
        const subMenuClasses = classNames('submenu', {
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>;
            // 拿到静态属性
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, { index: `${index}-${i}` });
            }
            // 如果不是MenuItem
            console.error('Warning: SubMenu has a child which is not a MenuItem component');
        });
        return (
            <Transition
                in={menuOpen}
                timeout={300}
                animation="zoom-in-top"
            >
                <ul className={subMenuClasses}>
                    {childrenComponent}
                </ul>
            </Transition>
        );
    }, [children, menuOpen, index]);
    // 绑定点击事件
    const handleClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!menuOpen);
    }, [menuOpen]);
    // 绑定鼠标移入移出事件
    let timer = useRef<number>();;
    const handleMouse = useCallback((e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer.current);
        e.preventDefault();
        timer.current = setTimeout(() => {
            setOpen(toggle);
        }, 300) as any;
    }, []);
    // 点击事件
    const clickEvents = useMemo(() =>
        context.mode === 'vertical' ?
            {
                onClick: handleClick,
            }
            : {},
        [context.mode, handleClick]);
    // 移如移出事件
    const hoverEvents = useMemo(() =>
        context.mode !== 'vertical' ?
            {
                onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
                onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false),
            }
            : {}
        , [context.mode, handleMouse]);
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
                <Icon icon="angle-down" className="arrow-icon" />
            </div>
            {renderChildren}
        </li>
    )
}
/** 标识，用来判断是否渲染 */
SubMenu.displayName = 'SubMenu';

export default SubMenu
