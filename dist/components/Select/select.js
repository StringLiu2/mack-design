var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useState, useMemo, useCallback, useRef } from 'react';
import classNames from 'classnames';
import Input from '../Input/input';
import useClickOutside from '../../hooks/useClickOutside';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
/**
 * ### 引用方式
 * ~~~js
 * import { Select } from 'mack-design';
 * ~~~
 * 支持HTMLInput的所有基本属性
 */
export var Select = function (_a) {
    var mode = _a.mode, data = _a.data, defaultSelect = _a.defaultSelect, onChange = _a.onChange, onVisibleChange = _a.onVisibleChange, props = __rest(_a, ["mode", "data", "defaultSelect", "onChange", "onVisibleChange"]);
    // 存放选中的索引
    var _b = useState([]), selectIndexArr = _b[0], setSelectIndexArr = _b[1];
    // 设置默认value值
    var defaultSelectValue = useMemo(function () {
        var _a;
        var indexArr = [];
        if (Array.isArray(defaultSelect)) {
            var values = data.filter(function (item, index) {
                var isSelect = defaultSelect.includes(item.value);
                if (isSelect) {
                    indexArr.push(index);
                }
                return isSelect;
            })
                .map(function (item) { return item.label; });
            if (mode === 'multiple') {
                // 这时候也需要设置默认的选中组件
                setSelectIndexArr(indexArr);
                return values.join(',');
            }
            else {
                // 放一个
                setSelectIndexArr([indexArr[0]]);
                return values[0];
            }
        }
        else if (defaultSelect) {
            var values = data.filter(function (item, index) {
                var isSelect = defaultSelect === item.value;
                if (isSelect)
                    indexArr.push(index);
                return isSelect;
            });
            setSelectIndexArr([indexArr[0]]);
            return (_a = values[0]) === null || _a === void 0 ? void 0 : _a.label;
        }
        return '';
    }, [defaultSelect, mode, data]);
    // 当前选中的值，单选情况下
    var _c = useState(defaultSelectValue), selectValue = _c[0], setSelectValue = _c[1];
    // 是否展示列表
    var _d = useState(false), isVisible = _d[0], setIsVisible = _d[1];
    // 高亮显示当前选中
    var _e = useState(-1), highlightIndex = _e[0], setHighlightIndex = _e[1];
    var selectComponentRef = useRef(null);
    // 移出点击就隐藏
    useClickOutside(selectComponentRef, function () { return setIsVisible(false); });
    // 处理显示 隐藏列表，触发onVisibleChange事件
    var handleVisible = useCallback(function (isVisible) {
        var _a;
        setIsVisible(isVisible);
        (_a = onVisibleChange) === null || _a === void 0 ? void 0 : _a(isVisible);
    }, [onVisibleChange]);
    // 选中当前项
    var handleClick = useCallback(function (item, selectIndex) {
        if (item.disabled)
            return; // 如果禁用 就无效
        // 然后需要对选中的放入选中数组当中
        setSelectIndexArr(function (selectIndexArr) {
            var _a, _b, _c;
            var index = selectIndexArr.indexOf(selectIndex);
            if (index === -1) { // 没有就放入
                if (mode === 'multiple') {
                    (_a = onChange) === null || _a === void 0 ? void 0 : _a(__spreadArrays(selectIndexArr, [selectIndex])); // 选中的索引
                    setSelectValue(function (val) { return val ? [val, item.label].join(',') : item.label; });
                    return __spreadArrays(selectIndexArr, [selectIndex]);
                }
                else {
                    (_b = onChange) === null || _b === void 0 ? void 0 : _b([selectIndex]); // 选中的索引
                    setSelectValue(item.label); // 选中的数据
                    // 单选，直接返回咯
                    return [selectIndex];
                }
            }
            else {
                selectIndexArr.splice(index, 1);
                setHighlightIndex(-1); // 设置没高亮了
                if (mode === 'multiple') {
                    // 只干掉一个
                    var filterData = data.filter(function (_, index) { return selectIndexArr.includes(index); });
                    setSelectValue(filterData.map(function (item) { return item.label; }).join(','));
                }
                else {
                    // 有则去掉
                    setSelectValue(''); // 清空
                }
                // 改变，传递-1，没有
                (_c = onChange) === null || _c === void 0 ? void 0 : _c(selectIndexArr);
                return __spreadArrays(selectIndexArr);
            }
        });
        handleVisible(false);
    }, [onChange, handleVisible, mode, data]);
    // 移动索引，让高亮现实位置改变, 但是有时候禁用了那个 就没办法选中，需要跳过
    var highlight = useCallback(function (currentIndex, selectNumber) {
        // 拿到当前索引
        var targetIndex = currentIndex; // 目标值
        var item;
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
        } while (item.disabled && (targetIndex !== 0 || targetIndex !== data.length - 1));
        // 标识移动到最后和第一个都是被禁用的，那就不动，一直在那个为止
        if (data[targetIndex].disabled) {
            targetIndex = currentIndex;
        }
        setHighlightIndex(targetIndex); // 重新设置高亮索引
    }, [data]);
    // 处理键盘事件 /** keyboard support */
    var handleKeyDown = useCallback(function (e) {
        switch (e.keyCode) {
            case 13: // 回车 找到那个直接调用选择方法
                // 需要存在这个才能按回车
                handleClick(data[highlightIndex], highlightIndex);
                break;
            case 38: // 向上的箭头
                // 如果没有显示列表，则展示，不移动
                if (!isVisible)
                    return handleVisible(true);
                highlight(highlightIndex, -1);
                break;
            case 40: // 向下的箭头
                // 如果没有显示列表，则展示，不移动
                if (!isVisible)
                    return handleVisible(true);
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
    var generateOptions = useMemo(function () { return (React.createElement("ul", { className: "select-list" }, data.map(function (item, index) {
        var classes = classNames('select-item', {
            'item-highlighted': index === highlightIndex,
            'is-active': selectIndexArr.includes(index),
            // 禁用的样式
            'is-disabled': item.disabled,
        });
        return (React.createElement("li", { key: item.value + "-" + index, className: classes, onClick: function () { return handleClick(item, index); } },
            item.label,
            selectIndexArr.includes(index) &&
                React.createElement("span", { className: "is-select" },
                    React.createElement(Icon, { icon: "check" }))));
    }))); }, [data, handleClick, selectIndexArr, highlightIndex]);
    return (React.createElement("div", { className: 'select', ref: selectComponentRef },
        React.createElement(Input, __assign({ onClick: function () {
                handleVisible(true);
            }, value: selectValue, onKeyDown: handleKeyDown, onChange: function () { }, 
            // 图标展示
            icon: isVisible ? "angle-down" : "angle-up" }, props)),
        React.createElement(Transition, { animation: "zoom-in-top", timeout: 300, in: isVisible }, generateOptions)));
};
Select.defaultProps = {
    mode: 'single',
    data: []
};
export default Select;
