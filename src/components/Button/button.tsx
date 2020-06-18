import React from 'react'
import classNames from 'classnames';



type ButtonSize = 'lg' | 'sm';
type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
    size?: ButtonSize;
    btnType?: ButtonType;
}
// 拿到原生React的类型
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;

// Partial 让类型变成可选的
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
const Button: React.FC<ButtonProps> = ({
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
