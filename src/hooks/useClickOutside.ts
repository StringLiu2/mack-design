import { RefObject, useEffect } from "react";

/** 当鼠标点击元素之外的地方触发的hooks */
export default function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            // 判断是不是ref指向那个元素中
            if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
                return;
            }
            // 不是当前元素，直接干掉
            handler(event);
        }
        document.addEventListener('click', listener);
        return () => {
            document.removeEventListener('click', listener);
        }
    }, [ref, handler]);
}