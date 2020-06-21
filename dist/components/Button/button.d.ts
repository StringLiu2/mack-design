import { ButtonHTMLAttributes, AnchorHTMLAttributes, FC } from 'react';
declare type ButtonSize = 'lg' | 'sm';
declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtonProps {
    className?: string;
    /** 设置 Button 是否禁用 */
    disabled?: boolean;
    /** 设置 Button 的尺寸 */
    size?: ButtonSize;
    /** 设置 Button 的类型 */
    btnType?: ButtonType;
    href?: string;
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * ### 引用方式
 * ~~~js
 * import { Button } from 'mack-design';
 * ~~~
 */
export declare const Button: FC<ButtonProps>;
export default Button;
