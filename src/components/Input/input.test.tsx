import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Input from './input';

describe('Test Input Component', () => {
    it('should render default Input component', () => {
        const change = jest.fn();
        const wrapper = render(<Input onChange={change} />);
        const testInputWrapper = wrapper.getByTestId('test-input-wrapper');
        const inputElement = testInputWrapper.getElementsByTagName('input')[0];
        expect(testInputWrapper).toBeInTheDocument();
        expect(testInputWrapper.querySelectorAll(":scope>*").length).toBe(1);
        expect(testInputWrapper).toHaveClass('input-wrapper');

        expect(inputElement).toHaveClass('mack-input-inner');
        fireEvent.change(inputElement, { target: { value: '111' } });
        expect(change).toHaveBeenCalled(); // 被调用了
        expect(change).toHaveBeenCalledWith(expect.any(Object)); // 传递的参数是对象
    });
    it('should render Input component to set disabled props', () => {
        const wrapper = render(<Input disabled />);
        const testInputWrapper = wrapper.getByTestId('test-input-wrapper');
        const inputElement = testInputWrapper.getElementsByTagName('input')[0];
        expect(testInputWrapper).toHaveClass('is-disabled');
        expect(inputElement.disabled).toBeTruthy();
    });
    it('should render Input component to set value and defaultValue props', () => {
        const wrapper = render(<Input value="111" defaultValue="222" />);
        const testInputWrapper = wrapper.getByTestId('test-input-wrapper');
        const inputElement = testInputWrapper.getElementsByTagName('input')[0];
        expect(inputElement.value).toBe('111');
        expect(inputElement.defaultValue).toBe('111');
    });
    it('should render Input component to set icon props', () => {
        const wrapper = render(<Input icon="user" />);
        const testInputWrapper = wrapper.getByTestId('test-input-wrapper');
        expect(testInputWrapper.querySelectorAll(":scope>*").length).toBe(2);
    });
    it('should render Input component to set size props', () => {
        const wrapperLg = render(<Input size="lg" />);
        const testWrapperLg = wrapperLg.getByTestId('test-input-wrapper');
        expect(testWrapperLg).toHaveClass('input-size-lg');
        cleanup();
        const wrapperSm = render(<Input size="sm" />);
        const testWrapperSm = wrapperSm.getByTestId('test-input-wrapper');
        expect(testWrapperSm).toHaveClass('input-size-sm');
    })
    it('should render Input component to set prepend and append props', () => {
        const wrapper = render(<Input prepend="prepend" append="append" />);
        const testInputWrapper = wrapper.getByTestId('test-input-wrapper');
        expect(testInputWrapper).toHaveClass('input-group input-group-prepend input-group-append')
        expect(testInputWrapper.querySelectorAll(":scope>*").length).toBe(3);

        expect(wrapper.getByText('prepend')).toBeInTheDocument();
        expect(wrapper.getByText('prepend')).toHaveClass('mack-input-group-prepend')
        expect(wrapper.getByText('append')).toBeInTheDocument();
        expect(wrapper.getByText('append')).toHaveClass('mack-input-group-append')
    })
});