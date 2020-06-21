import { FC, CSSProperties } from 'react';
import { ThemeProps } from '../Icon/icon';
export interface ProgressProps {
    /** 进度条多少的进度 */
    percent: number;
    /** 进度条的高度 */
    strokeHeight?: number;
    /** 是否显示进度条的文字 */
    showText?: boolean;
    styles?: CSSProperties;
    theme?: ThemeProps;
}
/**
 * ### 引入方式
 * ~~~js
 * import { Progress } from 'mack-design';
 * ~~~
 */
export declare const Progress: FC<ProgressProps>;
export default Progress;
