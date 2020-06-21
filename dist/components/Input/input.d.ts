import { FC, InputHTMLAttributes, ChangeEvent, ReactNode } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
declare type InputSize = 'lg' | 'sm';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /** 是否禁用input */
    disabled?: boolean;
    /** input大小， 支持 lg 或者 sm */
    size?: InputSize;
    /** 字体图标，在右侧悬浮添加一个图标，用于提示 */
    icon?: IconProp;
    /** 前缀，用于配置一些固定组合 */
    prepend?: ReactNode;
    /** 后缀，用于配置一些固定组合 */
    append?: ReactNode;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * ### 引用方式
 * ~~~js
 * import { Input } from 'mack-design';
 * ~~~
 * 支持HTMLInput的所有基本属性
 */
export declare const Input: FC<InputProps>;
export default Input;
