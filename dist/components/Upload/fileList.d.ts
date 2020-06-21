import { FC } from 'react';
import { UploadFile } from './upload';
export interface FileListProps {
    /** 文件列表 */
    fileList: UploadFile[];
    /** 删除一个文件的方法 */
    onRemove: (file: UploadFile) => void;
}
export declare const FileList: FC<FileListProps>;
export default FileList;
