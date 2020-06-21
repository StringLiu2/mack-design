import React, { FC, CSSProperties } from 'react'
import { ThemeProps } from '../Icon/icon'

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
export const Progress: FC<ProgressProps> = ({ 
    percent,
    strokeHeight,
    showText,
    styles,
    theme,
}) => {
    return (
        <div className="progress-bar" style={styles}>
            <div className="progress-bar-outer" style={{ height: `${strokeHeight}px` }}>
                <div 
                    className={`progress-bar-inner color-${theme}`}
                    style={{ width: `${percent}%` }}
                >
                    { showText && <span className="inner-text">{`${percent}%`}</span> }
                </div>
            </div>
        </div>
    )
}
Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: 'primary'
}
export default Progress
