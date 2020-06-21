import React from 'react';
import { storiesOf } from '@storybook/react'
import AutoComplete, { DataSource } from './autoComplete';
import { action } from '@storybook/addon-actions';

const defaultAutoComplete = () => {
    const data = ['test1', 'test2', 'test3', 'cook', 'pope', 'AD', 'green', 'width'];
    const handleFetch = (val: string): DataSource[] => {
        const filterData = data.filter(item => item.includes(val));
        return filterData.map(item => ({ value: item }));
    };
    return (
        <AutoComplete placeholder="default autocomplete" fetchSuggestions={handleFetch} onSelect={action('change select to value')} />
    );
};
interface DataItem { 
    value: string; 
    label: string; 
}
const customTemplateAutoComplete = () => {
    const data: DataItem[] = [
        {
            value: 'test1',
            label: 'test1'
        },
        {
            value: 'test2',
            label: 'test3'
        },
        {
            value: 'cook',
            label: 'cook'
        },
    ];
    const handleFetch = (val: string): DataSource[] => {
        return data.filter(item => item.value.includes(val));
    };
    const renderOption = ((data: DataSource<DataItem>) => (
        <code>{`
            const label = "${data.label}";
            const suggest = "${data.value}";
        `}</code>
    ))
    return (
        <AutoComplete placeholder="自定义模板" renderOption={renderOption as any} fetchSuggestions={handleFetch} onSelect={action('change select to value')} />
    );
}

const asyncAutoComplete = () => {
    const handleFetch = (val: string) => {
        return fetch(`https://api.github.com/search/users?q=${val}`)
        .then(res => res.json())
        .then(({ items }) => {
            return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
        });
    };
    return (
        <AutoComplete placeholder="search" fetchSuggestions={handleFetch} onSelect={action('change select to value')} />
    );
};

storiesOf('AutoComplete Component', module)
    .addDecorator((storiesFn: Function) => (
        <div style={{ width: '300px' }}>
            <br/>
            { storiesFn() }
            <code>
                <a target="__blank" href="/?path=/story/input-component">其他配置可以查看Input Component</a>
            </code>
        </div>
    ))
    .add('AutoComplete', defaultAutoComplete)
    .add('异步渲染的AutoComplete', asyncAutoComplete)
    .add('自定义模板的AutoComplete', customTemplateAutoComplete)