import React from 'react';
/**
 * ### 引入方式
 * ~~~js
 * import { Progress } from 'mack-design';
 * ~~~
 */
export var Progress = function (_a) {
    var percent = _a.percent, strokeHeight = _a.strokeHeight, showText = _a.showText, styles = _a.styles, theme = _a.theme;
    return (React.createElement("div", { className: "progress-bar", style: styles },
        React.createElement("div", { className: "progress-bar-outer", style: { height: strokeHeight + "px" } },
            React.createElement("div", { className: "progress-bar-inner color-" + theme, style: { width: percent + "%" } }, showText && React.createElement("span", { className: "inner-text" }, percent + "%")))));
};
Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: 'primary'
};
export default Progress;
