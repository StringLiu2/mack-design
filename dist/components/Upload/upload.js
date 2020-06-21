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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useRef, useCallback, useState } from 'react';
import axios from 'axios';
import FileList from './fileList';
import Dragger from './dragger';
/**
 * ### 引入方式
 * ~~~js
 * import { Upload } from 'mack-design';
 * ~~~
 */
export var Upload = function (_a) {
    var action = _a.action, defaultFileList = _a.defaultFileList, headers = _a.headers, name = _a.name, data = _a.data, withCredentials = _a.withCredentials, accept = _a.accept, multiple = _a.multiple, beforeUpload = _a.beforeUpload, onProgress = _a.onProgress, onSuccess = _a.onSuccess, onError = _a.onError, onChange = _a.onChange, onRemove = _a.onRemove, children = _a.children, drag = _a.drag;
    // 存储文件列表
    var _b = useState(defaultFileList || []), fileList = _b[0], setFileList = _b[1];
    // console.log(fileList);
    var fileInput = useRef(null);
    var handleClick = useCallback(function () {
        var _a;
        (_a = fileInput.current) === null || _a === void 0 ? void 0 : _a.click(); // 触发点击事件，出现文件上传界面
    }, []);
    // 更新的那个文件，第二个参数是一个UploadFile对象，可以提供哪个给这个对象都行
    var updateFileList = useCallback(function (updateFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (prevFile) {
                if (prevFile.uid === updateFile.uid) {
                    return __assign(__assign({}, prevFile), updateObj);
                }
                return prevFile;
            });
        });
    }, []);
    var post = useCallback(function (uploadFile) {
        setFileList(function (prevList) { return __spreadArrays([uploadFile], prevList); });
        var formData = new FormData();
        // 添加用户自定义携带的参数
        if (data && typeof data === 'object') {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        formData.append(name, uploadFile.raw);
        axios.post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-Type': "multipart/form-data" }),
            withCredentials: withCredentials,
            onUploadProgress: function (progressEvent) {
                var _a;
                var percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total) || 0;
                // 在还没上传完毕的情况下
                if (percentage < 100) {
                    var percentFileObj = {
                        percent: percentage,
                        status: "uploading"
                    };
                    // 改变状态，上传中，也更新fileList
                    updateFileList(uploadFile, percentFileObj);
                    // 如果有就调用这个
                    (_a = onProgress) === null || _a === void 0 ? void 0 : _a(progressEvent, __assign(__assign({}, uploadFile), percentFileObj));
                }
            }
        }).then(function (res) {
            var _a, _b;
            var successUploadObj = {
                status: "success",
                percent: 100,
                response: res.data
            };
            (_a = onChange) === null || _a === void 0 ? void 0 : _a(__assign(__assign({}, uploadFile), successUploadObj));
            (_b = onSuccess) === null || _b === void 0 ? void 0 : _b(res.data, __assign(__assign({}, uploadFile), successUploadObj));
            // 成功上传，继续调用更新这个fileList
            updateFileList(uploadFile, successUploadObj);
        }).catch(function (err) {
            var _a, _b;
            var errorUploadObj = {
                status: "error",
                error: err
            };
            (_a = onChange) === null || _a === void 0 ? void 0 : _a(__assign(__assign({}, uploadFile), errorUploadObj));
            (_b = onError) === null || _b === void 0 ? void 0 : _b(err, __assign(__assign({}, uploadFile), errorUploadObj));
            // 上传错误，也更新
            updateFileList(uploadFile, errorUploadObj);
        });
    }, [action, headers, data, withCredentials, name, updateFileList, onProgress, onSuccess, onError, onChange]);
    // 处理文件上传
    var uploadFiles = useCallback(function (files) {
        var postFiles = Array.from(files);
        // 开始上传
        postFiles.forEach(function (file) {
            // 创建我们的file
            var uploadFile = {
                uid: Date.now() + 'upload-file',
                status: 'ready',
                name: file.name,
                size: file.size,
                percent: 0,
                raw: file
            };
            // 没有这个回调方法
            if (!beforeUpload) {
                post(uploadFile);
            }
            else {
                var newFile = beforeUpload(uploadFile);
                if (newFile instanceof Promise) {
                    // 返回新的文件，处理后的文件上传
                    newFile.then(post);
                }
                else {
                    // 是否上传
                    newFile !== false && post(uploadFile);
                }
            }
        });
    }, [post, beforeUpload]);
    // 处理上传前的操作
    var handleUploadFile = useCallback(function (e) {
        var files = e.target.files;
        if (!files)
            return; // 没有文件
        uploadFiles(files); // 上传文件
        fileInput.current && (fileInput.current.value = ''); // 清空
    }, [uploadFiles]);
    // 处理删除操作
    var handleRemove = useCallback(function (file) {
        var _a;
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        (_a = onRemove) === null || _a === void 0 ? void 0 : _a(file); // 删除
    }, [onRemove]);
    return (React.createElement("div", { className: 'upload-component' },
        React.createElement("div", { className: "upload-input", style: { display: 'inline-block' }, onClick: handleClick },
            drag ?
                //  直接通过这个文件上传
                React.createElement(Dragger, { onFile: uploadFiles }, children)
                : children,
            React.createElement("input", { className: "file-input", ref: fileInput, onChange: handleUploadFile, style: { display: 'none' }, type: "file", accept: accept, multiple: multiple })),
        React.createElement(FileList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.defaultProps = {
    name: 'file',
    withCredentials: false,
    multiple: false,
};
export default Upload;
