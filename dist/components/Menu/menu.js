import React, { createContext, useState, useMemo } from 'react';
import classNames from 'classnames';
import MenuItem from './menuItem';
import SubMenu from './subMenu';
export var MenuContext = createContext({ index: '0' });
/**
 * ### 引用方式
 * ~~~js
 * import { Menu } from 'mack-design';
 * ~~~
 */
export var Menu = function (_a) {
    var _b;
    var mode = _a.mode, className = _a.className, style = _a.style, children = _a.children, defaultIndex = _a.defaultIndex, defaultOpenSubMenus = _a.defaultOpenSubMenus, onSelect = _a.onSelect;
    // 默认选中的那个index
    var _c = useState(defaultIndex), currentActive = _c[0], setActive = _c[1];
    // 合并出来的className
    var classes = classNames('menu', className, (_b = {},
        _b["menu-vertical"] = mode === 'vertical',
        _b["menu-horizontal"] = mode !== 'vertical',
        _b));
    // MenuContext的数据
    var passedContext = useMemo(function () { return ({
        index: currentActive,
        // 重写一下onSelect
        onSelect: function (currentIndex) {
            var _a;
            setActive(currentIndex);
            (_a = onSelect) === null || _a === void 0 ? void 0 : _a(currentIndex);
        },
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus
    }); }, [currentActive, onSelect, mode, defaultOpenSubMenus]);
    // 判断渲染组件是不是MenuItem, 并返回筛选后的children
    var renderChildren = useMemo(function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            // 拿到静态属性
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, { index: index.toString() });
            }
            // 如果不是MenuItem
            console.error('Warning: Menu has a child which is not a MenuItem component');
        });
    }, [children]);
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren)));
};
Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
};
export default Menu;
