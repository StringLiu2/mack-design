import React from 'react';
import Icon from '../Icon/icon';
import Progress from '../Progress/progress';
export var FileList = function (_a) {
    var fileList = _a.fileList, onRemove = _a.onRemove;
    return (React.createElement("ul", { className: "upload-list" }, fileList.map(function (file) {
        var _a;
        return (React.createElement("li", { className: "upload-list-item", key: file.uid },
            React.createElement("span", { className: "file-name file-name-" + file.status },
                React.createElement(Icon, { icon: "file-alt", theme: "secondary" }),
                file.name),
            React.createElement("span", { className: "file-status" },
                file.status === 'uploading' && React.createElement(Icon, { icon: "spinner", spin: true, theme: "primary" }),
                file.status === 'success' && React.createElement(Icon, { icon: "check-circle", theme: "success" }),
                file.status === 'error' && React.createElement(Icon, { icon: "times-circle", theme: "danger" })),
            React.createElement("span", { className: "file-actions" },
                React.createElement(Icon, { icon: "times", onClick: function () { return onRemove(file); } })),
            file.status === 'uploading' &&
                React.createElement(Progress, { percent: (_a = file.percent, (_a !== null && _a !== void 0 ? _a : 0)) })));
    })));
};
export default FileList;
