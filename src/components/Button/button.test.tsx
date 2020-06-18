import React from 'react';
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './button';

const testProps: ButtonProps = {
    btnType: 'primary',
    size: 'lg',
    className: 'custom'
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn(),
}

describe('test Button component', () => {
    it('should render the correct default button', () => {
        const wrapper = render(<Button>Nice</Button>);
        // 获取这个组件的文本
        const element = wrapper.getByText('Nice');
        // 是否是文档
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn btn-default');
    });
    it('should render the correct component based on different props', () => {
        const wrapper = render(<Button {...testProps}>Nice</Button>);
        const element = wrapper.getByText('Nice');
        // 是文档，并且拥有如下className
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('btn-primary btn-lg custom');
    })
    it('should render a link when btnType equals link and href is provided', () => {
        const wrapper = render(<Button btnType='link' href="http://dummyurl">Link</Button>)
        const element = wrapper.getByText('Link');
        // 这时候是个A标签，也有那些属性
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('A');
        expect(element).toHaveClass('btn btn-link');
    })
    it('should render disabled button when disabled set to true', () => {
        const wrapper = render(<Button {...disabledProps}>Nice</Button>)
        const element = wrapper.getByText('Nice') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        // 拥有disabled属性
        expect(element.disabled).toBeTruthy();
        // 触发事件后，onClick并没有被调用，因为禁用了
        fireEvent.click(element);
        expect(disabledProps.onClick).not.toHaveBeenCalled();
    })
});