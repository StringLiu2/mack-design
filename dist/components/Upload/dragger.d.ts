import { FC } from 'react';
export interface DraggerProps {
    /** 触发文件列表 */
    onFile: (files: FileList) => void;
}
export declare const Dragger: FC<DraggerProps>;
export default Dragger;
