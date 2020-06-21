import React, { FC } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

type TransitionProps = CSSTransitionProps & {
  /** 动画从哪个方向开始 */
  animation?: AnimationName;
  /** 是否再包裹一层div，防止原本设置了transition造成动画失效 */
  wrapper? : boolean;
  /** 动画持续时间 */
  timeout: number;
  /** 是否展示 */
  in: boolean;
}
/**
 * ### 引用方式
 * ~~~js
 * import { Transition } from 'mack-design';
 * ~~~
 */
export const Transition: FC<TransitionProps> = (props) => {
  const {
    children,
    classNames,
    animation,
    wrapper,
    ...restProps
  } = props
  return (
    <CSSTransition
      classNames = { classNames ? classNames : animation}
      {...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
}
Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
}

export default Transition;
