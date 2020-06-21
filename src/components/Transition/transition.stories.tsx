import React from 'react'
import { storiesOf } from '@storybook/react';
import { useState } from '@storybook/addons';
import Transition from './transition';
import Button from '../Button/button';

const defaultTransition = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [show, setShow] = useState<boolean>(false);
    return (
        <>
            <Button onClick={() => setShow(!show)}>点击显示隐藏</Button>
            <Transition timeout={300} in={show} animation="zoom-in-top" >
                <div>
                    <p>
                        Edit <code> src/App.tsx </code> and save to reload.
                    </p>
                    <p>
                        Edit <code> src/App.tsx </code> and save to reload.
                    </p>
                    <p>
                        Edit <code> src/App.tsx </code> and save to reload.
                    </p>
                    <p>
                        Edit <code> src/App.tsx </code> and save to reload.
                    </p>
                </div>
            </Transition>
        </>
    );
}

const differentDirectionTransition = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [show, setShow] = useState<boolean>(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [show2, setShow2] = useState<boolean>(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [show3, setShow3] = useState<boolean>(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [show4, setShow4] = useState<boolean>(false);
    return (
        <>
            <Button onClick={() => setShow(!show)}>top animation</Button>
            <Transition timeout={300} in={show} animation="zoom-in-top" >
                <p>
                    top show animation
                </p>
            </Transition>
            <br/>
            <br/>
            <Button onClick={() => setShow2(!show2)}>bottom animation</Button>
            <Transition timeout={300} in={show2} animation="zoom-in-bottom" >
                <p>
                    bottom show animation
                </p>
            </Transition>
            <br/>
            <br/>
            <Button onClick={() => setShow3(!show3)}>left animation</Button>
            <Transition timeout={300} in={show3} animation="zoom-in-left" >
                <p>
                    left show animation
                </p>
            </Transition>
            <br/>
            <br/>
            <Button onClick={() => setShow4(!show4)}>right animation</Button>
            <Transition timeout={300} in={show4} animation="zoom-in-right" >
                <p>
                    right show animation
                </p>
            </Transition>
        </>
    );
}

storiesOf('Transition Component', module)
    .add('Transition', defaultTransition)
    .add('不同方向显示隐藏的Transition', differentDirectionTransition)