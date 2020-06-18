import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react'
import Alert from './alert';

describe('test Alert Component', () => {
    it('should render the correct default Alert', () => {
        const wrapper = render(<Alert title="this is alert title"></Alert>);
        const titleElement = wrapper.getByText('this is alert title');
        // 如果只有标题，那么展示的是一个span
        expect(titleElement).toBeInTheDocument();
        expect(titleElement.tagName).toBe('SPAN');
        // 拿到整个div 判断外层div有没有这些className
        const alertElement = wrapper.getByTestId('test-alert');
        expect(alertElement).toBeInTheDocument();
        expect(alertElement).toHaveClass('alert alert-default'); 
        // 拿到关闭span，判断下关闭span的className tagName 是否是节点
        const closeElement = wrapper.getByTestId('test-alert-icon');
        expect(closeElement).toBeInTheDocument();
        expect(closeElement.tagName).toBe('SPAN');
        expect(closeElement).toHaveClass('close');
    });
    it('should render the correct Alert component to call onClose function props', () => {
        const fn = jest.fn();
        const wrapper = render(<Alert onClose={fn} title="this is alert title"></Alert>);
        const closeElement = wrapper.getByTestId('test-alert-icon');
        expect(closeElement).toBeInTheDocument();
        fireEvent.click(closeElement); // 触发事件,fn被调用一次，表示方法被执行
        expect(fn).toHaveBeenCalled();
    });
    it('should render the correct Alert component prop isClose is false', () => {
        const fn = jest.fn();
        const wrapper = render(<Alert isClose={false} onClose={fn} title="this is alert title"></Alert>);
        expect(wrapper.getByTestId('test-alert')).toBeInTheDocument();
        // 找不到关闭按钮
        let closeEle: HTMLSpanElement;
        try {
            closeEle = wrapper.getByText('关闭');
            fireEvent.click(closeEle);
        } catch (error) {
            expect(closeEle!).toBeUndefined();
        }
        // 找不到<span>关闭</span> 这时候fn没有被调用
        expect(fn).not.toHaveBeenCalled();
    });
    it('should render the correct component based on different props', () => {
        let wrapper = render(<Alert title="this is alert title">alert desc message</Alert>);
        const titleElement = wrapper.getByText('this is alert title');
        // 如果有标题有内容，标题展示h3 内容展示span
        expect(titleElement).toBeInTheDocument();
        expect(titleElement.tagName).toBe('H3');
        expect(wrapper.getByText('alert desc message').tagName).toBe('SPAN');
        // 改变type
        cleanup(); // 把render的清掉
        const wrapper2 = render(<Alert title="this is alert title2" type='success'>alert desc message</Alert>);
        const alertElement2 = wrapper2.getByTestId('test-alert');
        expect(alertElement2).toBeInTheDocument();
        expect(alertElement2).toHaveClass('alert alert-success');
    });
})