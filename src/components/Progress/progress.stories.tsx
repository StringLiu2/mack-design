import React from 'react';
import { storiesOf } from '@storybook/react'
import Progress from './progress';

const defaultProgress = () => (
    <>
        <Progress
            percent={10}
            showText={false}
            theme="success"
        />
        <br />
        <Progress
            percent={30}
            showText={true}
            theme="info"
        />
        <br />
        <Progress
            percent={50}
            showText={true}
            theme="danger"
        />
        <br />
        <Progress
            percent={70}
            showText={true}
            theme="dark"
        />
        <br/>
        <Progress
            percent={90}
            showText={true}
            strokeHeight={12}
            theme="warning"
        />
    </>
);


storiesOf('Progress Component', module)
    .add('Progress', defaultProgress)
