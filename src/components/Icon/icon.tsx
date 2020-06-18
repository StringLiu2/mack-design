import React from 'react'
import classNames from 'classnames';

import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
// library.add(faCoffee); // 这样使用单个图标
library.add(fas); // 一次性添加fa开始的图标

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'danger' | 'warning' | 'dark' | 'light';

interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps;
}
// 图标组件 自定义了className，通过Theme生成
const Icon: React.FC<IconProps> = ({ theme, className, ...props }) => {
    const classes = classNames('icon', className, {
        [`icon-${theme}`]: theme
    });
    return (
        <FontAwesomeIcon className={classes} {...props} />
    )
}

export default Icon
