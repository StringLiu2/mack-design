import React, { CSSProperties, FC } from 'react';
import MenuItem from './menuItem';
import SubMenu from './subMenu';
export declare type MenuMode = 'horizontal' | 'vertical';
declare type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
    /** 默认选中哪个index */
    defaultIndex?: string;
    className?: string;
    /** 水平还是垂直模式 */
    mode?: MenuMode;
    style?: CSSProperties;
    /** 点击之后触发的事件 */
    onSelect?: SelectCallback;
    /** 默认打开的subMenu */
    defaultOpenSubMenus?: string[];
}
/** 在Menu组件身上绑定的静态属性 */
interface MenuProperties {
    /** MenuItem */
    Item: typeof MenuItem;
    /** SubMenu */
    SubMenu: typeof SubMenu;
}
interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
/**
 * ### 引用方式
 * ~~~js
 * import { Menu } from 'mack-design';
 * ~~~
 */
export declare const Menu: FC<MenuProps> & MenuProperties;
export default Menu;
