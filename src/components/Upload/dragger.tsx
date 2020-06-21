import React, { FC, useState, useCallback, DragEvent } from 'react'
import classNames from 'classnames'
export interface DraggerProps {
    /** 触发文件列表 */
    onFile: (files: FileList) => void;
}

export const Dragger: FC<DraggerProps> = ({
    onFile,
    children,
}) => {
    const [dragOver, setDragOver] = useState(false);
    const classes = classNames('uploader-dragger', {
        'is-dragover': dragOver
    });
    const handleDrop = useCallback((e: DragEvent<HTMLElement>) => {
        e.preventDefault();
        setDragOver(false);
        // 拿到文件列表
        onFile(e.dataTransfer.files);
    }, [onFile]);
    // 修改drag状态
    const handleDrag = useCallback((e: DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault();
        setDragOver(over);
    }, []);
    return (
        <div
            className={classes}
            onDragOver={e => handleDrag(e, true)}
            onDragLeave={e => handleDrag(e, false)}
            onDrop={handleDrop}
        >
            {children}
        </div>
    )
}

export default Dragger
