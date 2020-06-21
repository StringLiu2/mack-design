import { FC } from 'react';
import { InputProps } from '../Input/input';
declare type SelectMode = 'multiple' | 'single';
export interface SelectData {
    label: string;
    value: string | number;
    disabled?: boolean;
}
export interface SelectProps extends Omit<InputProps, 'onChange'> {
    /** 支持单选多选两种模式 */
    mode?: SelectMode;
    /** 传递进来的列表数据 */
    data: SelectData[];
    /** 默认选中了的值，单选下只能一项，如果传递了数组，也直选中一个 */
    defaultSelect?: Array<string | number> | string | number;
    /** 在下拉菜单显示、隐藏调用 */
    onVisibleChange?: (isVisible: boolean) => void;
    /** 选中值发生变化的时候被触发，参数是第几项，选中的那项对象 */
    onChange?: (dataIndexArr: number[]) => void;
}
/**
 * ### 引用方式
 * ~~~js
 * import { Select } from 'mack-design';
 * ~~~
 * 支持HTMLInput的所有基本属性
 */
export declare const Select: FC<SelectProps>;
export default Select;
