import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Select, { SelectProps, SelectData } from './select';
import { config } from 'react-transition-group';

config.disabled = true; // 关闭动画的异步

const testData: SelectData[] = [
    {
        label: 'label-1',
        value: 'value1'
    },
    {
        label: 'label-2',
        value: 'value2',
        disabled: true
    },
    {
        label: 'label-3',
        value: 'value3',
        disabled: true
    },
    {
        label: 'label-4',
        value: 'value4'
    },
    {
        label: 'label-5',
        value: 'value5'
    },
]

const testDefaultProps: SelectProps = {
    data: testData,
    placeholder: 'test select',
    onChange: jest.fn(),
    onVisibleChange: jest.fn()
}

const testMultipleProps: SelectProps = {
    mode: 'multiple',
    ...testDefaultProps
}

const generateSelect = (props: SelectProps) => (
    <Select {...props} />
);

describe('test Select Component', () => {
    let wrapper: RenderResult,
        inputElement: HTMLElement;
    beforeEach(() => {
        wrapper = render(generateSelect(testDefaultProps))
        inputElement = wrapper.getByPlaceholderText('test select')
    })
    it('test click input to show select options', () => {
        expect(inputElement).toBeInTheDocument();
        // 点击按钮
        fireEvent.click(inputElement);
        // 这时候触发回调方法
        expect(testDefaultProps.onVisibleChange).toHaveBeenCalledWith(true);
        // 展开下拉项，总共有五项
        expect(wrapper.container.querySelectorAll(":scope ul>li").length).toBe(5);
        const label1 = wrapper.getByText('label-1')
        expect(label1).toHaveClass('select-item');
        expect(label1).not.toHaveClass('is-active');
        expect(label1).not.toHaveClass('is-disabled');
        expect(label1).not.toHaveClass('item-highlighted');
        // 这时候的label-2 label-3就有is-disabled
        expect(wrapper.getByText('label-2')).toHaveClass('is-disabled');
        expect(wrapper.getByText('label-3')).toHaveClass('is-disabled');
        // 点击1 选中按钮，触发方法
        fireEvent.click(label1);
        expect((inputElement as HTMLInputElement).value).toBe('label-1');
        expect(label1).toHaveClass('is-active');
        expect(testDefaultProps.onChange).toHaveBeenCalledWith([0]);
    });
    it('test click input and keydown enter to call function set highlighted index', () => {
        // 点击按钮
        fireEvent.click(inputElement);
        // 下 下 上 上  移动四次
        fireEvent.keyDown(inputElement, { keyCode: 40 });
        const label1 = wrapper.getByText('label-1');
        expect(label1).toHaveClass('item-highlighted');

        fireEvent.keyDown(inputElement, { keyCode: 40 });
        const label4 = wrapper.getByText('label-4');
        expect(label4).toHaveClass('item-highlighted');
        expect(label1).not.toHaveClass('item-highlighted');

        fireEvent.keyDown(inputElement, { keyCode: 38 });
        expect(label1).toHaveClass('item-highlighted');
        expect(label4).not.toHaveClass('item-highlighted');

        fireEvent.keyDown(inputElement, { keyCode: 38 });
        expect(label1).toHaveClass('item-highlighted');

        fireEvent.keyDown(inputElement, { keyCode: 13 });
        // 按下回车 选中
        expect((inputElement as HTMLInputElement).value).toBe('label-1');
        expect(label1).toHaveClass('is-active');
        expect(testDefaultProps.onVisibleChange).toHaveBeenCalledWith(false);
        expect(testDefaultProps.onChange).toHaveBeenCalledWith([0]);
        // 隐藏了列表
        expect(label1).not.toBeInTheDocument();

        // 然后继续向下移动一下，又显示了列表
        fireEvent.keyDown(inputElement, { keyCode: 40 });
        expect(label1).toHaveClass('item-highlighted');
        // 再次移动到label-4
        fireEvent.keyDown(inputElement, { keyCode: 40 });
        expect(wrapper.getByText('label-4')).toHaveClass('item-highlighted');

        // esc 关掉显示的列表，然后列表不见
        fireEvent.keyDown(inputElement, { keyCode: 27 });
        expect(testDefaultProps.onVisibleChange).toHaveBeenCalledWith(false);
        expect(label1).not.toBeInTheDocument();
    });
    it('test double click select options to clear input value', () => {
        // 点击后有内容，再次点击没有内容
        fireEvent.click(inputElement);

        fireEvent.click(wrapper.getByText('label-1'));
        expect(testDefaultProps.onChange).toHaveBeenCalledWith([0]);
        expect((inputElement as HTMLInputElement).value).toBe('label-1');

        fireEvent.click(inputElement);
        fireEvent.click(wrapper.getByText('label-1'));
        expect(testDefaultProps.onChange).toHaveBeenCalledWith([]);
        expect((inputElement as HTMLInputElement).value).toBe('');
    });
    it('test default select to input value', () => {
        cleanup();
        wrapper = render(generateSelect({
            ...testDefaultProps,
            defaultSelect: ['value1']
        }));
        inputElement = wrapper.getByPlaceholderText('test select');
        expect(inputElement).toBeInTheDocument();
        expect((inputElement as HTMLInputElement).value).toBe('label-1');
        fireEvent.click(inputElement);
        const label1 = wrapper.getByText('label-1');
        expect(label1).toHaveClass('is-active');
    })
    it('test multiple select to multiple select options', () => {
        cleanup();
        wrapper = render(generateSelect(testMultipleProps));
        inputElement = wrapper.getByPlaceholderText('test select');
        expect(inputElement).toBeInTheDocument();
        // 点击多次后，判断有没有内容，调用的方法
        // 点击按钮
        fireEvent.click(inputElement);
        // 这时候触发回调方法
        expect(testDefaultProps.onVisibleChange).toHaveBeenCalledWith(true);
        const label1 = wrapper.getByText('label-1');

        fireEvent.click(label1);
        expect(testDefaultProps.onVisibleChange).toHaveBeenCalledWith(false);
        expect(testMultipleProps.onChange).toHaveBeenCalledWith([0]);
        expect(label1).not.toBeInTheDocument();
        expect((inputElement as HTMLInputElement).value).toBe('label-1');
        // 再次点击打开列表、然后点击label-5
        fireEvent.click(inputElement);
        fireEvent.click(wrapper.getByText('label-5'));
        expect(testMultipleProps.onChange).toHaveBeenCalledWith([0, 4]);
        expect((inputElement as HTMLInputElement).value).toBe('label-1,label-5');

        // 再次打开，干掉了label-5
        fireEvent.click(inputElement);
        // 然后两个都有选中标识
        expect(label1).toHaveClass('is-active');
        expect(wrapper.getByText('label-5')).toHaveClass('is-active');
        // 然后点击
        fireEvent.click(wrapper.getByText('label-5'));
        expect(testMultipleProps.onChange).toHaveBeenCalledWith([0]);
        expect((inputElement as HTMLInputElement).value).toBe('label-1');
        // 再次打开看看label-5是不是没有标识了
        fireEvent.click(inputElement);
        expect(wrapper.getByText('label-5')).not.toHaveClass('is-active');
    });
    it('test default multiple select to input value', () => {
        cleanup();
        wrapper = render(generateSelect({
            ...testMultipleProps,
            defaultSelect: ['value1', 'value4']
        }));
        inputElement = wrapper.getByPlaceholderText('test select');
        expect(inputElement).toBeInTheDocument();
        expect((inputElement as HTMLInputElement).value).toBe('label-1,label-4');
        fireEvent.click(inputElement);
        const label1 = wrapper.getByText('label-1');
        const label4 = wrapper.getByText('label-4');
        expect(label1).toHaveClass('is-active');
        expect(label4).toHaveClass('is-active');
    })
});