import React, { FC, useRef, useCallback, ChangeEvent, useState } from 'react'
import axios from 'axios'
import FileList from './fileList';
import Dragger from './dragger';

export type FileStatus = 'ready' | 'uploading' | 'success' | 'error';

export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: FileStatus;
    percent?: number; // 进度条
    raw?: File; // 源文件的对象
    response?: any; // 成功的响应数据
    error?: any; // 失败的错误消息
}

export interface UploadProps {
    /** 发送到的http/https接口地址 */
    action: string;
    /** 默认的文件列表 */
    defaultFileList?: UploadFile[];
    /** 设置的请求头 */
    headers?: Record<string, any>;
    /** 文件参数名词  name */
    name?: string;
    /** 用户自定义的数据 */
    data?: Record<string, any>;
    /** 携带cookie */
    withCredentials?: boolean;
    /** input本身的file约束属性 */
    /** 约束，只能上传什么文件 */
    accept?: string;
    /** 是否上传多个文件 */
    multiple?: boolean;
    /** 是否拖动上传 */
    drag?: boolean;
    /** 文件上传钱的操作 */
    beforeUpload?: (file: UploadFile) => boolean | Promise<UploadFile>;
    /** 文件进度调用方法 */
    onProgress?: (e: ProgressEvent, file: UploadFile) => void;
    /** 文件上传了触发的方法 */
    onChange?: (file: UploadFile) => void;
    /** 上传成功 */
    onSuccess?: (data: any, file: UploadFile) => void;
    /** 上传失败 */
    onError?: (err: any, file: UploadFile) => void;
    /** 删除文件 */
    onRemove?: (file: UploadFile) => void;
}
/**
 * ### 引入方式
 * ~~~js
 * import { Upload } from 'mack-design';
 * ~~~
 */
export const Upload: FC<UploadProps> = ({
    action,
    defaultFileList,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    children,
    drag
}) => {
    // 存储文件列表
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
    // console.log(fileList);
    const fileInput = useRef<HTMLInputElement>(null);
    const handleClick = useCallback(() => {
        fileInput.current?.click(); // 触发点击事件，出现文件上传界面
    }, []);
    // 更新的那个文件，第二个参数是一个UploadFile对象，可以提供哪个给这个对象都行
    const updateFileList = useCallback((updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevList => {
            return prevList.map(prevFile => {
                if (prevFile.uid === updateFile.uid) {
                    return { ...prevFile, ...updateObj };
                }
                return prevFile;
            });
        })
    }, []);
    const post = useCallback((uploadFile: UploadFile) => {
        setFileList(prevList => [uploadFile, ...prevList]);
        const formData = new FormData();
        // 添加用户自定义携带的参数
        if (data && typeof data === 'object') {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });
        }
        formData.append(name!, uploadFile.raw!);
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': "multipart/form-data",
            },
            withCredentials,
            onUploadProgress(progressEvent: ProgressEvent) {
                const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total) || 0;
                // 在还没上传完毕的情况下
                if (percentage < 100) {
                    const percentFileObj: Partial<UploadFile> = {
                        percent: percentage,
                        status: "uploading"
                    };
                    // 改变状态，上传中，也更新fileList
                    updateFileList(uploadFile, percentFileObj);
                    // 如果有就调用这个
                    onProgress?.(progressEvent, { ...uploadFile, ...percentFileObj });
                }
            }
        }).then(res => {
            const successUploadObj: Partial<UploadFile> = {
                status: "success",
                percent: 100,
                response: res.data
            };
            onChange?.({ ...uploadFile, ...successUploadObj });
            onSuccess?.(res.data, { ...uploadFile, ...successUploadObj });
            // 成功上传，继续调用更新这个fileList
            updateFileList(uploadFile, successUploadObj);
        }).catch(err => {
            const errorUploadObj: Partial<UploadFile> = {
                status: "error",
                error: err
            }
            onChange?.({ ...uploadFile, ...errorUploadObj });
            onError?.(err, { ...uploadFile, ...errorUploadObj });
            // 上传错误，也更新
            updateFileList(uploadFile, errorUploadObj);
        });
    }, [action, headers, data, withCredentials, name, updateFileList, onProgress, onSuccess, onError, onChange]);
    // 处理文件上传
    const uploadFiles = useCallback((files: FileList) => {
        const postFiles = Array.from(files);
        // 开始上传
        postFiles.forEach(file => {
            // 创建我们的file
            const uploadFile: UploadFile = {
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
            } else {
                const newFile = beforeUpload(uploadFile);
                if (newFile instanceof Promise) {
                    // 返回新的文件，处理后的文件上传
                    newFile.then(post);
                } else {
                    // 是否上传
                    newFile !== false && post(uploadFile);
                }
            }
        });
    }, [post, beforeUpload]);
    // 处理上传前的操作
    const handleUploadFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return; // 没有文件
        uploadFiles(files); // 上传文件

        fileInput.current && (fileInput.current.value = ''); // 清空
    }, [uploadFiles]);
    // 处理删除操作
    const handleRemove = useCallback((file: UploadFile) => {
        setFileList(prevList => {
            return prevList.filter(item => item.uid !== file.uid);
        });
        onRemove?.(file); // 删除
    }, [onRemove]);
    return (
        <div className='upload-component'>
            <div
                className="upload-input"
                style={{ display: 'inline-block' }}
                onClick={handleClick}
            >
                {drag ?
                    //  直接通过这个文件上传
                    <Dragger onFile={uploadFiles}>{children}</Dragger>
                    : children
                }
                <input
                    className="file-input"
                    ref={fileInput}
                    onChange={handleUploadFile}
                    style={{ display: 'none' }}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                />
            </div>
            {/* 展示文件列表 */}
            <FileList fileList={fileList} onRemove={handleRemove} />
        </div>
    )
}
Upload.defaultProps = {
    name: 'file',
    withCredentials: false,
    multiple: false,
}
export default Upload
