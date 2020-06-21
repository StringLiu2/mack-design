import { FC } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
export declare type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'danger' | 'warning' | 'dark' | 'light';
interface IconProps extends FontAwesomeIconProps {
    /** Icon组件的theme */
    theme?: ThemeProps;
    /** Icon的类型，通过Icon不同展示不同的Icon */
    icon: IconProp;
    /** Icon的大小 */
    size?: SizeProp;
}
/**
 * ### 引用方式
 * ~~~js
 * import { Icon } from 'mack-design';
 * ~~~
 */
export declare const Icon: FC<IconProps>;
export default Icon;
