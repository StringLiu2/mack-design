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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
/**
 * ### 引用方式
 * ~~~js
 * import { Alert } from 'mack-design';
 * ~~~
 */
export var Alert = function (_a) {
    var _b;
    var type = _a.type, isClose = _a.isClose, className = _a.className, title = _a.title, children = _a.children, onClose = _a.onClose, restProps = __rest(_a, ["type", "isClose", "className", "title", "children", "onClose"]);
    var classes = classNames('alert', className, (_b = {},
        _b["alert-" + type] = type,
        _b));
    var _c = useState(true), show = _c[0], setShow = _c[1];
    var alertRef = useRef();
    // 自己干掉自己，也可以让用户自定义操作
    var close = useCallback(function () {
        if (onClose) {
            onClose(alertRef.current);
        }
        // 不用干掉自己，直接隐藏了
        // alertRef.current?.parentElement?.removeChild(alertRef.current);
        setShow(false);
    }, [onClose]);
    return (React.createElement(Transition, { timeout: 300, in: show, animation: "zoom-in-left" },
        React.createElement("div", __assign({ className: classes, ref: alertRef }, restProps, { "data-testid": "test-alert" }),
            children ? React.createElement("h3", null, title) : React.createElement("span", null, title),
            children && React.createElement("span", null, children),
            isClose &&
                React.createElement("span", { className: "close", onClick: close, "data-testid": "test-alert-icon" },
                    React.createElement(Icon, { icon: "times" })))));
};
Alert.defaultProps = {
    type: 'default',
    isClose: true
};
export default Alert;
