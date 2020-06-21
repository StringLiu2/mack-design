import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, FC } from 'react'
import classNames from 'classnames';



type ButtonSize = 'lg' | 'sm';
type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
    className?: string;
    /** 设置 Button 是否禁用 */
    disabled?: boolean;
    /** 设置 Button 的尺寸 */
    size?: ButtonSize;
    /** 设置 Button 的类型 */
    btnType?: ButtonType;
    href?: string;
}
// 拿到原生React的类型
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;

// Partial 让类型变成可选的
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * ### 引用方式
 * ~~~js
 * import { Button } from 'mack-design';
 * ~~~
 */
export const Button: FC<ButtonProps> = ({
    btnType,
    disabled,
    size,
    children,
    href,
    className,
    ...restProps // 其他的属性
}) => {
    // 默认有btn，然后根据不同的size、type  添加 btn-lg...
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        "disabled": (btnType === 'link') && disabled
    });

    if (btnType === 'link' && href) {
        return (
            <a
                className={classes}
                href={href}
                {...restProps}
            >{children}</a>
        )
    }
    return (
        <button
            className={classes}
            disabled={disabled}
            {...restProps}
        >
            {children}
        </button>
    )

}
Button.defaultProps = {
    disabled: false,
    btnType: 'default'
}
export default Button;
