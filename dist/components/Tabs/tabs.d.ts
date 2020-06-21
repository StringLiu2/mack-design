import React, { FC, Dispatch, SetStateAction, ReactNode, CSSProperties } from 'react';
import TabItem from './tabItem';
declare type TabMode = "tab" | "card";
declare type SelectCallback = (selectedIndex: string) => void;
export interface TabsProps {
    /** tab模式和card卡片模式 */
    mode?: TabMode;
    /** 默认选中哪个tab */
    defaultIndex?: string;
    className?: string;
    style?: CSSProperties;
    /** 点击之后触发的事件 */
    onSelect?: SelectCallback;
}
interface TabsProperties {
    /** 每个tab 组件 */
    Item: typeof TabItem;
}
interface ITabsContext {
    index: string;
    onSelect: SelectCallback;
    renderChildren: Dispatch<SetStateAction<ReactNode>>;
}
export declare const TabsContext: React.Context<ITabsContext>;
/**
 * ### 引用方式
 * ~~~js
 * import { Tabs } from 'mack-design';
 * ~~~
 */
export declare const Tabs: FC<TabsProps> & TabsProperties;
export default Tabs;
