import { FC } from 'react';
export interface SubMenuProps {
    /** 当前是否被选中的标识 */
    index?: string;
    /** SubMenu必备的标题 */
    title: string;
    className?: string;
}
export declare const SubMenu: FC<SubMenuProps>;
export default SubMenu;
