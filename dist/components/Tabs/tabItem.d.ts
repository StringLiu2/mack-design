import { FC, ReactNode, CSSProperties } from 'react';
/** TabItem的参数配置 */
export interface TabItemProps {
    /** 当前的index,用于是否被选中 */
    index?: string;
    /** 展示的label内容 是一个ReactNode */
    label: ReactNode;
    /** 是否禁止点击 */
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
}
export declare const TabItem: FC<TabItemProps>;
export default TabItem;
