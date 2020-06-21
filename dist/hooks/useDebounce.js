import { useState, useEffect } from 'react';
/** 节流的hooks */
export default function useDebounce(value, delay) {
    if (delay === void 0) { delay = 300; }
    var _a = useState(value), debounceValue = _a[0], setDebounceValue = _a[1];
    useEffect(function () {
        // 创建定时器
        var handler = window.setTimeout(function () {
            setDebounceValue(value);
        }, delay);
        // 清除上次定时器
        return function () {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debounceValue;
}
