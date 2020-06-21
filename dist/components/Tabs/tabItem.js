import React, { useContext, useCallback, useMemo, useEffect } from 'react';
import classNames from 'classnames';
import { TabsContext } from './tabs';
export var TabItem = function (_a) {
    var index = _a.index, label = _a.label, disabled = _a.disabled, className = _a.className, style = _a.style, children = _a.children;
    var context = useContext(TabsContext);
    // 是否已经激活
    var isActive = useMemo(function () { return context.index === index; }, [context, index]);
    // tab-item || tab-item is-disabled is-active
    var classes = classNames('tab-item', className, {
        'is-disabled': disabled,
        'is-active': isActive
    });
    var handleClick = useCallback(function () {
        // 如果禁用、或者没有index、或者已经激活就没办法调用onSelect
        if (!disabled && index && !isActive)
            context.onSelect(index);
    }, [context, index, disabled, isActive]);
    useEffect(function () {
        /* 判断是否选中才渲染children，给父组件渲染 */
        isActive && context.renderChildren(React.createElement("div", null, children));
    }, [isActive, context, children]);
    return (React.createElement("li", { className: classes, onClick: handleClick, style: style, key: index }, label));
};
// 标识，如果没有这个标识就不渲染并且打印error信息
TabItem.displayName = 'TabItem';
TabItem.defaultProps = {
    index: '0',
    disabled: false
};
export default TabItem;
