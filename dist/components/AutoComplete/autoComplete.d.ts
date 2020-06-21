import { FC, ReactNode } from 'react';
import { InputProps } from '../Input/input';
interface DataSourceObject {
    value: string;
}
/** data的数据类型 */
export declare type DataSource<T = {}> = T & DataSourceObject;
/** 组件的props类型 */
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /** 对数据进行处理返回 */
    fetchSuggestions: (value: string, data?: string[]) => DataSource[] | Promise<DataSource[]>;
    /** 告诉用户选了那个值 */
    onSelect?: (suggest: DataSource) => void;
    /** custom option， 用户自定义模板 */
    renderOption?: (suggest: DataSource) => ReactNode;
    /** debounce 防抖的毫秒值 */
    debounceTime?: number;
}
/**
 * ### 引用方式
 * ~~~js
 * import { AutoComplete } from 'mack-design';
 * ~~~
 * 支持HTMLInput的所有基本属性
 */
export declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
