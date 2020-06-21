import { CSSProperties, FC } from 'react';
export interface MenuItemProps {
    /** 当前是否被选中的index标识 */
    index?: string;
    /** 是否禁止点击 */
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
}
export declare const MenuItem: FC<MenuItemProps>;
export default MenuItem;
