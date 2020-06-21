import React, { useContext, useCallback } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
export var MenuItem = function (_a) {
    var index = _a.index, disabled = _a.disabled, className = _a.className, style = _a.style, children = _a.children;
    // 通过useContext拿到Menu组件存储的context数据
    var _b = useContext(MenuContext), currentIndex = _b.index, onSelect = _b.onSelect;
    var classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': currentIndex === index // 索引一致就添加这个class
    });
    // 点击li调用的方法，切换的，被Menu封装后的onSelect
    var handleClick = useCallback(function () {
        var _a;
        // 防止disabled也能调用
        if (!disabled && index && !(currentIndex === index))
            (_a = onSelect) === null || _a === void 0 ? void 0 : _a(index); // 传递当前index
    }, [index, onSelect, disabled, currentIndex]);
    return (React.createElement("li", { className: classes, style: style, key: index, onClick: handleClick }, children));
};
/** 标识，如果没有这个标识就不渲染并且打印error信息 */
MenuItem.displayName = 'MenuItem';
MenuItem.defaultProps = {
    index: '0',
    disabled: false
};
export default MenuItem;
