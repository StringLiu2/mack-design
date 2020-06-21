import { FC } from 'react';
export declare type FileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: FileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
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
export declare const Upload: FC<UploadProps>;
export default Upload;
