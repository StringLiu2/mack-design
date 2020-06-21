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
import React from 'react';
import classNames from 'classnames';
/**
 * ### 引用方式
 * ~~~js
 * import { Button } from 'mack-design';
 * ~~~
 */
export var Button = function (_a) {
    var _b;
    var btnType = _a.btnType, disabled = _a.disabled, size = _a.size, children = _a.children, href = _a.href, className = _a.className, restProps = __rest(_a, ["btnType", "disabled", "size", "children", "href", "className"]) // 其他的属性
    ;
    // 默认有btn，然后根据不同的size、type  添加 btn-lg...
    var classes = classNames('btn', className, (_b = {},
        _b["btn-" + btnType] = btnType,
        _b["btn-" + size] = size,
        _b["disabled"] = (btnType === 'link') && disabled,
        _b));
    if (btnType === 'link' && href) {
        return (React.createElement("a", __assign({ className: classes, href: href }, restProps), children));
    }
    return (React.createElement("button", __assign({ className: classes, disabled: disabled }, restProps), children));
};
Button.defaultProps = {
    disabled: false,
    btnType: 'default'
};
export default Button;
