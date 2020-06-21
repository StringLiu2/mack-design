import { ReactNode, FC, HTMLAttributes } from 'react';
declare type AlertType = 'success' | 'default' | 'danger' | 'warning';
interface BaseAlertProps {
    /** alert的类型，背景色 */
    type?: AlertType;
    /** 是否有关闭 x */
    isClose?: boolean;
    /** Alert组件的标题 */
    title: string | ReactNode;
    /** 关闭Alert组件回调方法 */
    onClose?: (currentEvent: HTMLDivElement) => any;
}
export declare type AlertProps = BaseAlertProps & HTMLAttributes<HTMLElement>;
/**
 * ### 引用方式
 * ~~~js
 * import { Alert } from 'mack-design';
 * ~~~
 */
export declare const Alert: FC<AlertProps>;
export default Alert;
