import React, { FC } from 'react'
import { UploadFile } from './upload'
import Icon from '../Icon/icon'
import Progress from '../Progress/progress'

export interface FileListProps {
    /** 文件列表 */
    fileList: UploadFile[];
    /** 删除一个文件的方法 */
    onRemove: (file: UploadFile) => void;
}

export const FileList: FC<FileListProps> = ({
    fileList, onRemove
}) => {
    return (
        <ul className="upload-list">
            {
                fileList.map(file => {
                    return (
                        <li className="upload-list-item" key={file.uid}>
                            <span className={`file-name file-name-${file.status}`}>
                                {/* 左边的文件 */}
                                <Icon icon="file-alt" theme="secondary"/>
                                {file.name}
                            </span>
                            <span className="file-status">
                                 { file.status === 'uploading' && <Icon icon="spinner" spin theme="primary" /> }
                                 { file.status === 'success' && <Icon icon="check-circle" theme="success" /> }
                                 { file.status === 'error' && <Icon icon="times-circle" theme="danger" /> }
                            </span>
                            <span className="file-actions">
                                <Icon icon="times" onClick={() => onRemove(file)} />
                            </span>
                            { file.status === 'uploading' &&
                                <Progress percent={file.percent ?? 0}/>
                             }
                        </li>
                    );
                })
            }
        </ul>
    )
}

export default FileList
