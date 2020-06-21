import React, { FC } from 'react'
import classNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { library, IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

// library.add(faCoffee); // 这样使用单个图标
library.add(fas); // 一次性添加fa开始的图标

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'danger' | 'warning' | 'dark' | 'light';

interface IconProps extends FontAwesomeIconProps {
    /** Icon组件的theme */
    theme?: ThemeProps;
    /** Icon的类型，通过Icon不同展示不同的Icon */
    icon: IconProp;
    /** Icon的大小 */
    size?: SizeProp;
}
// 图标组件 自定义了className，通过Theme生成
/**
 * ### 引用方式
 * ~~~js
 * import { Icon } from 'mack-design';
 * ~~~
 */
export const Icon: FC<IconProps> = ({ theme, className, ...props }) => {
    const classes = classNames('icon', className, {
        [`icon-${theme}`]: theme
    });
    return (
        <FontAwesomeIcon className={classes} {...props} />
    )
}

export default Icon
