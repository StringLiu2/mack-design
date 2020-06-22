import React, { FC, useState, useMemo, useCallback, useRef, KeyboardEvent } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import useClickOutside from '../../hooks/useClickOutside';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';

type SelectMode = 'multiple' | 'single';

export interface SelectData {
    label: string; // 展示的值
    value: string | number; // 返回的值
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
    /** 选中值发生变化的时候被触发，参数是选中的下标，选中的那项对象 */
    onChange?: (dataIndexArr: number[]) => void;
}
/**
 * ### 引用方式
 * ~~~js
 * import { Select } from 'mack-design';
 * ~~~
 * 支持HTMLInput的所有基本属性
 */
export const Select: FC<SelectProps> = ({
    mode,
    data,
    defaultSelect,
    onChange,
    onVisibleChange,
    ...props
}) => {
    // 存放选中的索引
    const [selectIndexArr, setSelectIndexArr] = useState<number[]>([]);
    // 设置默认value值
    const defaultSelectValue = useMemo(() => {
        const indexArr: number[] = [];
        if (Array.isArray(defaultSelect)) {
            const values = data.filter((item, index) => {
                const isSelect = defaultSelect.includes(item.value);
                if (isSelect) {
                    indexArr.push(index);
                }
                return isSelect;
            })
                .map(item => item.label);
            if (mode === 'multiple') {
                // 这时候也需要设置默认的选中组件
                setSelectIndexArr(indexArr);
                return values.join(',')
            } else {
                // 放一个
                setSelectIndexArr([indexArr[0]]);
                return values[0];
            }
        } else if (defaultSelect) {
            const values = data.filter((item, index) => {
                const isSelect = defaultSelect === item.value;
                if (isSelect) indexArr.push(index);
                return isSelect;
            });
            setSelectIndexArr([indexArr[0]]);
            return values[0]?.label;
        }
        return '';
    }, [defaultSelect, mode, data]);
    // 当前选中的值，单选情况下
    const [selectValue, setSelectValue] = useState<string | number>(defaultSelectValue);
    // 是否展示列表
    const [isVisible, setIsVisible] = useState(false);
    // 高亮显示当前选中
    const [highlightIndex, setHighlightIndex] = useState<number>(-1);
    const selectComponentRef = useRef<HTMLDivElement>(null);
    // 移出点击就隐藏
    useClickOutside(selectComponentRef, () => setIsVisible(false));
    // 处理显示 隐藏列表，触发onVisibleChange事件
    const handleVisible = useCallback((isVisible: boolean) => {
        setIsVisible(isVisible);
        onVisibleChange?.(isVisible);
    }, [onVisibleChange]);
    // 选中当前项
    const handleClick = useCallback((item: SelectData, selectIndex: number) => {
        if (item.disabled) return; // 如果禁用 就无效
        // 然后需要对选中的放入选中数组当中
        setSelectIndexArr(selectIndexArr => {
            const index = selectIndexArr.indexOf(selectIndex);
            if (index === -1) { // 没有就放入
                if (mode === 'multiple') {
                    onChange?.(
                        [...selectIndexArr, selectIndex]
                    ); // 选中的索引
                    setSelectValue(val => val ? [val, item.label].join(',') : item.label);
                    return [...selectIndexArr, selectIndex];
                } else {
                    onChange?.([selectIndex]); // 选中的索引
                    setSelectValue(item.label); // 选中的数据
                    // 单选，直接返回咯
                    return [selectIndex];
                }
            } else {
                selectIndexArr.splice(index, 1);
                setHighlightIndex(-1); // 设置没高亮了
                if (mode === 'multiple') {
                    // 只干掉一个
                    const filterData = data.filter((_, index) => selectIndexArr.includes(index));
                    setSelectValue(filterData.map(item => item.label).join(','));
                } else {
                    // 有则去掉
                    setSelectValue(''); // 清空
                }
                // 改变，传递-1，没有
                onChange?.(selectIndexArr);
                return [...selectIndexArr];
            }
        });
        handleVisible(false);
    }, [onChange, handleVisible, mode, data]);
    // 移动索引，让高亮现实位置改变, 但是有时候禁用了那个 就没办法选中，需要跳过
    const highlight = useCallback((currentIndex: number, selectNumber: number) => {
        // 拿到当前索引
        let targetIndex: number = currentIndex; // 目标值
        let item: SelectData;
        // 不是最后一个也不是第一个，并且是禁止情况下，继续循环
        do {
            // 每次判断之后加减法，用原本的+selectNumber
            targetIndex += selectNumber;
            if (targetIndex < 0) {
                targetIndex = 0;
            }
            // 如果大于等于总长度，那就最后一项
            if (targetIndex >= data.length) {
                targetIndex = data.length - 1;
            }
            item = data[targetIndex];
        } while (item.disabled && (targetIndex !== 0 || targetIndex !== data.length - 1))
        // 标识移动到最后和第一个都是被禁用的，那就不动，一直在那个为止
        if (data[targetIndex].disabled) {
            targetIndex = currentIndex;
        }
        setHighlightIndex(targetIndex); // 重新设置高亮索引
    }, [data]);
    // 处理键盘事件 /** keyboard support */
    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13: // 回车 找到那个直接调用选择方法
                // 需要存在这个才能按回车
                handleClick(data[highlightIndex], highlightIndex);
                break;
            case 38: // 向上的箭头
                // 如果没有显示列表，则展示，不移动
                if (!isVisible) return handleVisible(true);
                highlight(highlightIndex, - 1);
                break;
            case 40: // 向下的箭头
                // 如果没有显示列表，则展示，不移动
                if (!isVisible) return handleVisible(true);
                highlight(highlightIndex, 1);
                break;
            case 27: // esc 隐藏下拉菜单
                handleVisible(false);
                setHighlightIndex(-1); // 直接变回去-1
                break;
            default:
                break;
        }
    }, [highlight, highlightIndex, isVisible, handleClick, data, handleVisible]);
    // 渲染每个Option
    const generateOptions = useMemo(() => (
        <ul className="select-list">
            {data.map((item, index) => {
                const classes = classNames('select-item', {
                    'item-highlighted': index === highlightIndex,
                    'is-active': selectIndexArr.includes(index), // 选中的样式
                    // 禁用的样式
                    'is-disabled': item.disabled,
                });
                return (
                    <li key={`${item.value}-${index}`} className={classes} onClick={() => handleClick(item, index)}>
                        {/* 渲染数据，同时先判断有没有设置了用户自定义模板 */}
                        {item.label}
                        {selectIndexArr.includes(index) &&
                            <span className="is-select">
                                <Icon icon="check" />
                            </span>
                        }
                    </li>
                );
            })}
        </ul>
    ), [data, handleClick, selectIndexArr, highlightIndex]);
    return (
        <div className='select' ref={selectComponentRef} >
            {/* input 框不能手动输入，点击选项以后自动填入对应 value */}
            {/* 单选模式 */}
            <Input
                onClick={() => {
                    handleVisible(true)
                }}
                value={selectValue}
                onKeyDown={handleKeyDown}
                onChange={() => { }}
                // 图标展示
                icon={isVisible ? "angle-down" : "angle-up"}
                {...props} />
            {/* 多选模式 */}
            {/* 用tag代表每一项，还能点击x关闭 暂时不实现 */}
            <Transition animation="zoom-in-top" timeout={300} in={isVisible}>
                {/* 显示下拉列表 */}
                {generateOptions}
            </Transition>
        </div>
    )
}
Select.defaultProps = {
    mode: 'single',
    data: []
}
export default Select;
