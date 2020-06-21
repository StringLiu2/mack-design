var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState, useContext, useMemo, useCallback, useRef } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import Transition from '../Transition/transition';
import Icon from '../Icon/icon';
export var SubMenu = function (_a) {
    var index = _a.index, title = _a.title, children = _a.children, className = _a.className;
    var context = useContext(MenuContext);
    // 判断是否默认打开
    var isOpened = useMemo(function () { var _a; return (index && context.mode === 'vertical') ? (_a = context.defaultOpenSubMenus) === null || _a === void 0 ? void 0 : _a.includes(index) : false; }, [index, context]);
    var _b = useState(isOpened), menuOpen = _b[0], setOpen = _b[1];
    var classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical',
    });
    // 渲染子节点, 子节点一定是MenuItem
    var renderChildren = useMemo(function () {
        var subMenuClasses = classNames('submenu', {
            'menu-opened': menuOpen
        });
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            // 拿到静态属性
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, { index: index + "-" + i });
            }
            // 如果不是MenuItem
            console.error('Warning: SubMenu has a child which is not a MenuItem component');
        });
        return (React.createElement(Transition, { in: menuOpen, timeout: 300, animation: "zoom-in-top" },
            React.createElement("ul", { className: subMenuClasses }, childrenComponent)));
    }, [children, menuOpen, index]);
    // 绑定点击事件
    var handleClick = useCallback(function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    }, [menuOpen]);
    // 绑定鼠标移入移出事件
    var timer = useRef();
    ;
    var handleMouse = useCallback(function (e, toggle) {
        clearTimeout(timer.current);
        e.preventDefault();
        timer.current = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    }, []);
    // 点击事件
    var clickEvents = useMemo(function () {
        return context.mode === 'vertical' ?
            {
                onClick: handleClick,
            }
            : {};
    }, [context.mode, handleClick]);
    // 移如移出事件
    var hoverEvents = useMemo(function () {
        return context.mode !== 'vertical' ?
            {
                onMouseEnter: function (e) { return handleMouse(e, true); },
                onMouseLeave: function (e) { return handleMouse(e, false); },
            }
            : {};
    }, [context.mode, handleMouse]);
    return (React.createElement("li", __assign({ key: index, className: classes }, hoverEvents),
        React.createElement("div", __assign({ className: "submenu-title" }, clickEvents),
            title,
            React.createElement(Icon, { icon: "angle-down", className: "arrow-icon" })),
        renderChildren));
};
/** 标识，用来判断是否渲染 */
SubMenu.displayName = 'SubMenu';
export default SubMenu;
