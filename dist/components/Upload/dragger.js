import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
export var Dragger = function (_a) {
    var onFile = _a.onFile, children = _a.children;
    var _b = useState(false), dragOver = _b[0], setDragOver = _b[1];
    var classes = classNames('uploader-dragger', {
        'is-dragover': dragOver
    });
    var handleDrop = useCallback(function (e) {
        e.preventDefault();
        setDragOver(false);
        // 拿到文件列表
        onFile(e.dataTransfer.files);
    }, [onFile]);
    // 修改drag状态
    var handleDrag = useCallback(function (e, over) {
        e.preventDefault();
        setDragOver(over);
    }, []);
    return (React.createElement("div", { className: classes, onDragOver: function (e) { return handleDrag(e, true); }, onDragLeave: function (e) { return handleDrag(e, false); }, onDrop: handleDrop }, children));
};
export default Dragger;
