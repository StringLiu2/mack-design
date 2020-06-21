import React, { useContext, useCallback, CSSProperties, FC } from 'react'
import classNames from 'classnames';
import { MenuContext } from './menu';

export interface MenuItemProps {
    /** 当前是否被选中的index标识 */
    index?: string;
    /** 是否禁止点击 */
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
}

export const MenuItem: FC<MenuItemProps> = ({
    index,
    disabled,
    className,
    style,
    children
}) => {
    // 通过useContext拿到Menu组件存储的context数据
    const { index: currentIndex, onSelect } = useContext(MenuContext);
    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': currentIndex === index // 索引一致就添加这个class
    });
    // 点击li调用的方法，切换的，被Menu封装后的onSelect
    const handleClick = useCallback(() => {
        // 防止disabled也能调用
        if (!disabled && index && !(currentIndex === index)) onSelect?.(index); // 传递当前index
    }, [index, onSelect, disabled, currentIndex]);

    return (
        <li className={classes} style={style} key={index} onClick={handleClick}>
            {children}
        </li>
    )
}
/** 标识，如果没有这个标识就不渲染并且打印error信息 */
MenuItem.displayName = 'MenuItem';

MenuItem.defaultProps = {
    index: '0',
    disabled: false
}
export default MenuItem
