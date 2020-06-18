import React, { useCallback, useRef, useState } from 'react'
import classNames from 'classnames';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';

type AlertType = 'success' | 'default' | 'danger' | 'warning';

interface BaseAlertProps {
    type?: AlertType;
    isClose?: boolean;
    title: string | React.ReactNode;
    onClose?: (currentEvent: HTMLDivElement) => any;
}
export type AlertProps = BaseAlertProps & React.HTMLAttributes<HTMLElement>;

const Alert: React.FC<AlertProps> = ({
    type,
    isClose,
    className,
    title,
    children,
    onClose,
    ...restProps
}) => {
    const classes = classNames('alert', className, {
        [`alert-${type}`]: type
    });
    const [show, setShow] = useState<boolean>(true);
    const alertRef = useRef<HTMLDivElement>();
    // 自己干掉自己，也可以让用户自定义操作
    const close = useCallback(() => {
        if (onClose) {
            onClose(alertRef.current!);
        }
        // 不用干掉自己，直接隐藏了
        // alertRef.current?.parentElement?.removeChild(alertRef.current);
        setShow(false);
    }, [onClose]);
    return (
        <Transition timeout={300} in={show} animation="zoom-in-left">
            <div className={classes} ref={alertRef as any} {...restProps} data-testid="test-alert">
                {children ? <h3>{title}</h3> : <span>{title}</span>}
                {children && <span>{children}</span>}
                {isClose && 
                    <span className="close" onClick={close} data-testid="test-alert-icon">
                        <Icon icon="times" />
                    </span>}
            </div>
        </Transition>
    )
}
Alert.defaultProps = {
    type: 'default',
    isClose: true
}
export default Alert
