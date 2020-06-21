import { FC } from 'react';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
declare type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';
declare type TransitionProps = CSSTransitionProps & {
    /** 动画从哪个方向开始 */
    animation?: AnimationName;
    /** 是否再包裹一层div，防止原本设置了transition造成动画失效 */
    wrapper?: boolean;
    /** 动画持续时间 */
    timeout: number;
    /** 是否展示 */
    in: boolean;
};
/**
 * ### 引用方式
 * ~~~js
 * import { Transition } from 'mack-design';
 * ~~~
 */
export declare const Transition: FC<TransitionProps>;
export default Transition;
