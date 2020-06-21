import React, { FC, InputHTMLAttributes, ChangeEvent, ReactNode } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import Icon from '../Icon/icon';

type InputSize = 'lg' | 'sm';

// Omit 忽略类型中的某个参数,比如size
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /** 是否禁用input */
    disabled?: boolean;
    /** input大小， 支持 lg 或者 sm */
    size?: InputSize;
    /** 字体图标，在右侧悬浮添加一个图标，用于提示 */
    icon?: IconProp;
    /** 前缀，用于配置一些固定组合 */
    prepend?: ReactNode;
    /** 后缀，用于配置一些固定组合 */
    append?: ReactNode;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * ### 引用方式
 * ~~~js
 * import { Input } from 'mack-design';
 * ~~~
 * 支持HTMLInput的所有基本属性
 */
export const Input: FC<InputProps> = ({
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    ...props
}) => {
    // 根据属性计算不同的className
    const classes = classNames('input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend,
    });
    // 如果设置了value，那就删掉defaultValue 
    if('value' in props) {
        delete props.defaultValue;
        // 如果是undefined null 就设置为''
        props.value = props.value ?? '';
    }
    return (
        // 根据属性判断是否要添加特定的节点
        <div className={classes} style={style} data-testid="test-input-wrapper">
            { prepend && <div className="mack-input-group-prepend">{ prepend }</div> }
            { icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`} /></div> }
            <input 
                className="mack-input-inner"
                disabled={disabled}
                { ...props }
            />
            { append && <div className="mack-input-group-append">{ append }</div> }
        </div>
    )
}
Input.defaultProps = {
    disabled: false
}
export default Input
