import React, { useContext, useCallback, useMemo, useEffect, FC, ReactNode, CSSProperties } from 'react'
import classNames from 'classnames';
import { TabsContext } from './tabs';

/** TabItem的参数配置 */
export interface TabItemProps {
    /** 当前的index,用于是否被选中 */
    index?: string;
    /** 展示的label内容 是一个ReactNode */
    label: ReactNode;
    /** 是否禁止点击 */
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
}

export const TabItem: FC<TabItemProps> = ({
    index,
    label,
    disabled,
    className,
    style,
    children
}) => {
    const context = useContext(TabsContext);
    // 是否已经激活
    const isActive = useMemo(() => context.index === index, [context, index]);
    // tab-item || tab-item is-disabled is-active
    const classes = classNames('tab-item', className, {
        'is-disabled': disabled,
        'is-active': isActive
    });
    const handleClick = useCallback(() => {
        // 如果禁用、或者没有index、或者已经激活就没办法调用onSelect
        if (!disabled && index && !isActive) context.onSelect(index);
    }, [context, index, disabled, isActive]);
    useEffect(() => {
        /* 判断是否选中才渲染children，给父组件渲染 */
        isActive && context.renderChildren(<div>{children}</div>);
    }, [isActive, context, children]);
    return (
        <li className={classes} onClick={handleClick} style={style} key={index}>
            {label}
        </li>
    )
}
// 标识，如果没有这个标识就不渲染并且打印error信息
TabItem.displayName = 'TabItem';

TabItem.defaultProps = {
    index: '0',
    disabled: false
}
export default TabItem
