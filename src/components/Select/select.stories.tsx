import React from 'react';
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions';
import Select, { SelectData } from './select';

const data: SelectData[] = [
    {
        label: '选中',
        value: '值'
    },
    {
        label: '选中22',
        value: '值2',
        disabled: true
    },
    {
        label: '选中2222',
        value: '值21',
        disabled: true
    },
    {
        label: '选中3',
        value: '值3'
    },
    {
        label: '选中4',
        value: '值4'
    },
];
const defaultSelect = () => {
    return (
        <>
            <span>默认</span>
            <Select data={data.filter(item => !item.disabled)} placeholder="default Select Component" onVisibleChange={action('isVisible')} onChange={action('change select')} />
            <span>选项禁用</span>
            <Select data={data} placeholder="default disabled Select Item" onVisibleChange={action('isVisible')} onChange={action('change select')} />
        </>
    )
};

const defaultValueSelect = () => {
    return (
        <>
            <span>默认值</span>
            <Select data={data} defaultSelect="值3" placeholder="default value Select Component" />
            <span>禁用Select</span>
            <Select data={data} disabled defaultSelect="值3" placeholder="default disabled Select Component" />
        </>
    )
}

const multipleValueSelect = () => {
    return (
        <Select
            data={data}
            mode="multiple"
            defaultSelect={['值', '值3']}
            placeholder="multiple Select Component" />
    )
}

storiesOf('Select Component', module)
    .addDecorator((storiesFn: Function) => (
        <div style={{ width: '300px' }}>{storiesFn()}</div>
    ))
    .add('Select', defaultSelect)
    .add('默认值的Select', defaultValueSelect)
    .add('multiple的Select', multipleValueSelect)