import React, { useState, FC, ChangeEvent, useCallback, useMemo, ReactNode, useEffect, KeyboardEvent, useRef } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import Transition from '../Transition/transition';

interface DataSourceObject {
    value: string;
}
/** data的数据类型 */
export type DataSource<T = {}> = T & DataSourceObject;

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
export const AutoComplete: FC<AutoCompleteProps> = ({
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    debounceTime,
    ...props
}) => {
    const [inputValue, setInputValue] = useState(value as string);
    const [suggestions, setSuggestions] = useState<DataSource[]>([]);
    // 是否loading的状态
    const [loading, setLoading] = useState<boolean>(false);
    // 高亮的索引
    const [highlightIndex, setHighlightIndex] = useState(-1);
    // 方式点击回车，或者点击选项的时候选中结果又触发一次useEffect重新请求，这时候我们需要定义一个变量来限制
    const triggerSearch = useRef<boolean>(false);
    // 存放整个组件的ref
    const autoCompleteRef = useRef<HTMLDivElement>(null);
    // 获取节流后的值
    const debounceValue = useDebounce(inputValue, debounceTime);
    // 监听点击的位置，然后关闭下拉菜单
    /** click outside 收起菜单 */
    useClickOutside(autoCompleteRef, () => setSuggestions([]));
    // 监听inputValue的变化
    useEffect(() => {
        // 不止有值，还要确定当前是搜索中，才能获取列表
        if (debounceValue && triggerSearch.current) {
            const result = fetchSuggestions?.(debounceValue);
            // 判断是不是返回Promise
            if (result instanceof Promise) {
                // 清空然后再加载
                setSuggestions([]);
                // 加载中
                setLoading(true);
                result.then(suggestions => {
                    setSuggestions(suggestions);
                    // 加载完毕
                    setLoading(false);
                });
            } else {
                setSuggestions(result);
            }
        } else {
            setSuggestions([]);
        }
        setHighlightIndex(-1); // 输入完毕后，然后变回去-1
    }, [debounceValue, fetchSuggestions]);
    // 移动索引，让高亮现实位置改变
    const highlight = useCallback((index: number) => {
        if (index < 0) {
            index = 0;
        }
        // 如果大于等于总长度，那就最后一项
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index); // 重新设置高亮索引
    }, [suggestions]);

    // 改变change
    const change = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);
        // 标识搜索中
        triggerSearch.current = true;
    }, []);
    // 选中了
    const handleSelect = useCallback((dataSource: DataSource) => {
        // 设置value
        setInputValue(dataSource.value);
        // 清除下拉菜单
        setSuggestions([]);
        // 返回select
        onSelect?.(dataSource);
        // 标识搜索完毕了
        triggerSearch.current = false;
    }, [onSelect]);
    // 处理键盘事件 /** keyboard support */
    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13: // 回车 找到那个直接调用选择方法
                // 需要存在这个才能按回车
                suggestions[highlightIndex] && handleSelect(suggestions[highlightIndex]);
                break;
            case 38: // 向上的箭头
                highlight(highlightIndex - 1);
                break;
            case 40: // 向下的箭头
                highlight(highlightIndex + 1);
                break;
            case 27: // esc 清除下拉菜单
                setSuggestions([]);
                setHighlightIndex(-1); // 直接变回去-1
                break;
            default:
                break;
        }
    }, [highlight, highlightIndex, suggestions, handleSelect]);
    // 渲染的模板
    const renderTemplate = useCallback((dataSource: DataSource) => {
        return renderOption ? renderOption(dataSource) : dataSource.value;
    }, [renderOption]);
    // 生成下拉列表
    const generateDropdown = useMemo(() => (
        <Transition
            // loading，如果当请求结束，这个loading就变成false，下拉菜单就不见了
            // 所以需要设置一个suggestions的长度是否大于0
            in={suggestions.length > 0 || loading}
            animation="zoom-in-top"
            timeout={300}
            onExited={() => { setSuggestions([]) }}
        >
            <ul className="suggestion-list">
                {loading &&
                    <div className="suggestions-loading-icon">
                        <Icon icon="spinner" spin />
                    </div>
                }
                {suggestions.map((suggest, index) => {
                    const classes = classNames('suggestion-item', {
                        'item-highlighted': index === highlightIndex
                    });
                    return (
                        <li key={index} className={classes} onClick={() => handleSelect(suggest)}>
                            {/* 渲染数据，同时先判断有没有设置了用户自定义模板 */}
                            {renderTemplate(suggest)}
                        </li>
                    );
                })}
            </ul>
        </Transition>
    ), [suggestions, loading, handleSelect, renderTemplate, highlightIndex]);
    return (
        <div className="auto-complete" ref={autoCompleteRef}>
            <Input
                value={inputValue}
                onChange={change}
                onKeyDown={handleKeyDown}
                {...props}
            />
            {/* suggestions.length > 0 &&  不用了因为使用了动画组件，这里不用判断 */}
            {generateDropdown}
        </div>
    )
}

export default AutoComplete;
