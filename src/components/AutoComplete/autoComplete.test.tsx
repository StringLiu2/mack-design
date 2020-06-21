import React from 'react';
import { render, fireEvent, cleanup, RenderResult, wait } from '@testing-library/react'
import { config } from 'react-transition-group'
import AutoComplete, { AutoCompleteProps, DataSource } from './autoComplete';


config.disabled = true; // 让动画变成同步，没有异步

const testArray = [
    { value: 'ab', number: 11 },
    { value: 'abc', number: 1 },
    { value: 'b', number: 4 },
    { value: 'c', number: 15 },
]
const testProps: AutoCompleteProps = {
    fetchSuggestions: (query) => { return testArray.filter(item => item.value.includes(query)) },
    onSelect: jest.fn(),
    placeholder: 'auto-complete'
}
const handleFetch = (val: string) => {
    return new Promise<typeof testArray>((resolve, reject) => {
        setTimeout(() => {
            resolve(testArray);
        }, 600);
    }).then(data => {
        return data.filter(item => item.value.includes(val));
    })
};

let wrapper: RenderResult,
    inputNode: HTMLInputElement;

describe('Test AutoComplete Component', () => {
    beforeEach(() => {
        wrapper = render(<AutoComplete {...testProps} />)
        inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
    })
    it('test basic AutoComplete behavior', async () => {
        // input change
        fireEvent.change(inputNode, { target: { value: 'a' } });
        await wait(() => {
            // 等到ab出现了
            expect(wrapper.queryByText('ab')).toBeInTheDocument();
            // should have two suggestion items
            expect(wrapper.container.querySelectorAll('.suggestion-item').length).toBe(2);
            // click the first item
            fireEvent.click(wrapper.getByText('ab'));
            // 这个方法被调用了，参数就是整个对象
            expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 });
            // 下拉菜单消失
            expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
            // fill the input
            expect(inputNode.value).toBe('ab');
        });
    });
    it('should provide keyboard support', async () => {
        // input change
        fireEvent.change(inputNode, { target: { value: 'a' } });
        await wait(() => {
            // 等到ab出现了
            expect(wrapper.queryByText('ab')).toBeInTheDocument();
        });
        const firstResult = wrapper.queryByText('ab');
        const secondResult = wrapper.queryByText('abc');
        // 往下移动前
        expect(firstResult).toHaveClass('suggestion-item');
        expect(firstResult).not.toHaveClass('item-highlighted');
        // arrow down
        fireEvent.keyDown(inputNode, { keyCode: 40 });
        // 移动后
        expect(firstResult).toHaveClass('item-highlighted');
        // arrow down
        fireEvent.keyDown(inputNode, { keyCode: 40 });
        expect(firstResult).not.toHaveClass('item-highlighted');
        expect(secondResult).toHaveClass('item-highlighted');
        // arrow up
        fireEvent.keyDown(inputNode, { keyCode: 38 });
        expect(firstResult).toHaveClass('item-highlighted');
        expect(secondResult).not.toHaveClass('item-highlighted');
        // press enter
        fireEvent.keyDown(inputNode, { keyCode: 13 });
        expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 });
        // 下拉菜单消失
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
        // fill the input
        expect(inputNode.value).toBe('ab')
    });
    it('click outside should hide the dropdown', async () => {
        // input change
        fireEvent.change(inputNode, { target: { value: 'a' } });
        await wait(() => {
            // 等到ab出现了
            expect(wrapper.queryByText('ab')).toBeInTheDocument();
        });
        fireEvent.click(document); // 点击了外面
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
    });
    it('renderOption should generate the right template', async () => {
        cleanup();
        const renderOption = (dataSource: DataSource) => {
            return <code className={`custom-${dataSource.value}`}>{dataSource.value}</code>
        }
        wrapper = render(<AutoComplete {...testProps} renderOption={renderOption} />);
        inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
        // 输入内容
        fireEvent.change(inputNode, { target: { value: 'a' } });
        // 然后生成两个li
        await wait(() => {
            // 等到ab出现了
            expect(wrapper.queryByText('ab')).toBeInTheDocument();
        });
        // 拥有自定义的class
        expect(wrapper.queryByText('ab')).toHaveClass('custom-ab');
        expect(wrapper.queryByText('abc')).toHaveClass('custom-abc');
    });
    it('async fetchSuggestions should works fine', async () => {
        cleanup();
        wrapper = render(<AutoComplete {...testProps} fetchSuggestions={handleFetch} />);
        inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
        // 输入内容
        fireEvent.change(inputNode, { target: { value: 'a' } });
        // 然后生成两个li
        await wait(() => {
            // 等到ab出现了
            expect(wrapper.queryByText('ab')).toBeInTheDocument();
            expect(wrapper.queryByText('abc')).toBeInTheDocument();
        });
    });
});