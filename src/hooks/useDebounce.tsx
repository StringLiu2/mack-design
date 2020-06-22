import { useState, useEffect } from 'react'

/** 节流的hooks */
export default function useDebounce(value: any, delay: number = 300) {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {   
        // 创建定时器
        const handler = window.setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        // 清除上次定时器
        return () => {
            clearTimeout(handler);
        }
    }, [value, delay]);
    return debounceValue;
}