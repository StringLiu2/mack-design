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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
// library.add(faCoffee); // 这样使用单个图标
library.add(fas); // 一次性添加fa开始的图标
// 图标组件 自定义了className，通过Theme生成
/**
 * ### 引用方式
 * ~~~js
 * import { Icon } from 'mack-design';
 * ~~~
 */
export var Icon = function (_a) {
    var _b;
    var theme = _a.theme, className = _a.className, props = __rest(_a, ["theme", "className"]);
    var classes = classNames('icon', className, (_b = {},
        _b["icon-" + theme] = theme,
        _b));
    return (React.createElement(FontAwesomeIcon, __assign({ className: classes }, props)));
};
export default Icon;
