import { RefObject } from "react";
/** 当鼠标点击元素之外的地方触发的hooks */
export default function useClickOutside(ref: RefObject<HTMLElement>, handler: Function): void;
