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
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Input from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import Transition from '../Transition/transition';
/**
 * ### 引用方式
 * ~~~js
 * import { AutoComplete } from 'mack-design';
 * ~~~
 * 支持HTMLInput的所有基本属性
 */
export var AutoComplete = function (_a) {
    var fetchSuggestions = _a.fetchSuggestions, onSelect = _a.onSelect, value = _a.value, renderOption = _a.renderOption, debounceTime = _a.debounceTime, props = __rest(_a, ["fetchSuggestions", "onSelect", "value", "renderOption", "debounceTime"]);
    var _b = useState(value), inputValue = _b[0], setInputValue = _b[1];
    var _c = useState([]), suggestions = _c[0], setSuggestions = _c[1];
    // 是否loading的状态
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    // 高亮的索引
    var _e = useState(-1), highlightIndex = _e[0], setHighlightIndex = _e[1];
    // 方式点击回车，或者点击选项的时候选中结果又触发一次useEffect重新请求，这时候我们需要定义一个变量来限制
    var triggerSearch = useRef(false);
    // 存放整个组件的ref
    var autoCompleteRef = useRef(null);
    // 获取节流后的值
    var debounceValue = useDebounce(inputValue, debounceTime);
    // 监听点击的位置，然后关闭下拉菜单
    /** click outside 收起菜单 */
    useClickOutside(autoCompleteRef, function () { return setSuggestions([]); });
    // 监听inputValue的变化
    useEffect(function () {
        var _a;
        // 不止有值，还要确定当前是搜索中，才能获取列表
        if (debounceValue && triggerSearch.current) {
            var result = (_a = fetchSuggestions) === null || _a === void 0 ? void 0 : _a(debounceValue);
            // 判断是不是返回Promise
            if (result instanceof Promise) {
                // 清空然后再加载
                setSuggestions([]);
                // 加载中
                setLoading(true);
                result.then(function (suggestions) {
                    setSuggestions(suggestions);
                    // 加载完毕
                    setLoading(false);
                });
            }
            else {
                setSuggestions(result);
            }
        }
        else {
            setSuggestions([]);
        }
        setHighlightIndex(-1); // 输入完毕后，然后变回去-1
    }, [debounceValue, fetchSuggestions]);
    // 移动索引，让高亮现实位置改变
    var highlight = useCallback(function (index) {
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
    var change = useCallback(function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        // 标识搜索中
        triggerSearch.current = true;
    }, []);
    // 选中了
    var handleSelect = useCallback(function (dataSource) {
        var _a;
        // 设置value
        setInputValue(dataSource.value);
        // 清除下拉菜单
        setSuggestions([]);
        // 返回select
        (_a = onSelect) === null || _a === void 0 ? void 0 : _a(dataSource);
        // 标识搜索完毕了
        triggerSearch.current = false;
    }, [onSelect]);
    // 处理键盘事件 /** keyboard support */
    var handleKeyDown = useCallback(function (e) {
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
    var renderTemplate = useCallback(function (dataSource) {
        return renderOption ? renderOption(dataSource) : dataSource.value;
    }, [renderOption]);
    // 生成下拉列表
    var generateDropdown = useMemo(function () { return (React.createElement(Transition
    // loading，如果当请求结束，这个loading就变成false，下拉菜单就不见了
    // 所以需要设置一个suggestions的长度是否大于0
    , { 
        // loading，如果当请求结束，这个loading就变成false，下拉菜单就不见了
        // 所以需要设置一个suggestions的长度是否大于0
        in: suggestions.length > 0 || loading, animation: "zoom-in-top", timeout: 300, onExited: function () { setSuggestions([]); } },
        React.createElement("ul", { className: "suggestion-list" },
            loading &&
                React.createElement("div", { className: "suggestions-loading-icon" },
                    React.createElement(Icon, { icon: "spinner", spin: true })),
            suggestions.map(function (suggest, index) {
                var classes = classNames('suggestion-item', {
                    'item-highlighted': index === highlightIndex
                });
                return (React.createElement("li", { key: index, className: classes, onClick: function () { return handleSelect(suggest); } }, renderTemplate(suggest)));
            })))); }, [suggestions, loading, handleSelect, renderTemplate, highlightIndex]);
    return (React.createElement("div", { className: "auto-complete", ref: autoCompleteRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: change, onKeyDown: handleKeyDown }, props)),
        generateDropdown));
};
export default AutoComplete;
