import { RefObject, useEffect } from "react";

/** 当鼠标点击元素之外的地方触发的hooks */
export default function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
                return;
            }
            handler(event);
        }
        document.addEventListener('click', listener);
        return () => {
            document.removeEventListener('click', listener);
        }
    }, [ref, handler]);
}