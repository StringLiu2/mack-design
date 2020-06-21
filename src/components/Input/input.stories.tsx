import React from 'react';
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions';
import { useState } from '@storybook/addons';
import Input from './input';
import Icon from '../Icon/icon';

const defaultInput = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<string>('');
    return (
        <>
            <Input onChange={action('change')} placeholder="placeholder" />
            <Input disabled placeholder="disabled" />
            <Input value={value} onChange={e => setValue(e.target.value)} placeholder="MVVM" />
        </>
    )
};

const sizeInput = () => (
    <>
        <Input size="sm" placeholder="small input" />
        <Input size="lg" placeholder="large input" />
    </>
);

const iconInput = () => (
    <>
        <Input icon="user" placeholder="user icon input" />
        <Input icon="file" placeholder="file icon input" />
    </>
);

const prependOrAppendInput = () => (
    <>
        <Input append=".com" placeholder="please enter website url" />
        <Input append={<Icon icon="search" />} placeholder="search content" />
        <Input prepend="https://" placeholder="please enter url" />
        <Input prepend={<Icon icon="icons" />} placeholder="please enter content" />
    </>
);

storiesOf('Input Component', module)
    .add('Input', defaultInput)
    .add('不同size的Input', sizeInput)
    .add('可以设置Icon的Input', iconInput)
    .add('可以设置前后缀的Input', prependOrAppendInput)