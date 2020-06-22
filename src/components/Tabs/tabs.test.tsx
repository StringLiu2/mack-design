import React from 'react';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import Tabs, { TabsProps } from './tabs';

let wrapper: RenderResult,
    tabsUlElement: HTMLElement, // test-tab-ul
    activeElement: HTMLElement,
    renderChildElement: HTMLElement,
    disabledElement: HTMLElement;

const testTabsProps: TabsProps = {
    className: 'test',
    onSelect: jest.fn()
}

const testTabsCardProps: TabsProps = {
    mode: 'card',
    defaultIndex: '2',
}

const renderTestTabs = (props: TabsProps) => {
    return (
        <Tabs {...props}>
            <Tabs.Item label='tab-1'>this is tab one</Tabs.Item>
            <Tabs.Item label='tab-2' disabled>this is tab two</Tabs.Item>
            <Tabs.Item label='tab-3'>this is tab three</Tabs.Item>
        </Tabs>
    )
}

describe('test Tabs and TabItem component', () => {
    beforeEach(() => {
        wrapper = render(renderTestTabs(testTabsProps));
        tabsUlElement = wrapper.getByTestId('test-tab-ul');
        renderChildElement = wrapper.getByText('this is tab one');
        activeElement = wrapper.getByText('tab-1');
        disabledElement = wrapper.getByText('tab-2');
    });
    it('should render correct Tabs and TabItem based on default props', () => {
        expect(tabsUlElement).toBeInTheDocument();
        expect(tabsUlElement.querySelectorAll(":scope li").length).toBe(3);
        expect(tabsUlElement).toHaveClass('tabs');
        expect(tabsUlElement.tagName).toBe('UL');
        // 渲染的子节点数据
        expect(renderChildElement).toBeInTheDocument(); 
        expect(renderChildElement.tagName).toBe('DIV');
        // 选中的
        expect(activeElement).toBeInTheDocument(); 
        expect(activeElement.tagName).toBe('LI');
        expect(activeElement).toHaveClass('tab-item is-active');
        // 禁用的
        expect(disabledElement).toBeInTheDocument(); 
        expect(disabledElement.tagName).toBe('LI');
        expect(disabledElement).toHaveClass('tab-item is-disabled');
    });
    it('click items should change active and call the right callback', () => {
        const targetTabItem = wrapper.getByText('tab-3');
        expect(targetTabItem).toHaveClass('tab-item');
        fireEvent.click(targetTabItem);
        expect(targetTabItem).toHaveClass('is-active');
        expect(testTabsProps.onSelect).toHaveBeenCalledWith('2');
        // 没有了之前的样式
        expect(activeElement).not.toHaveClass('is-active');
        // 文字也变化了
        expect(renderChildElement.textContent).toBe('this is tab three');
        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass('is-active');
        expect(testTabsProps.onSelect).not.toHaveBeenCalledWith('1');
    });
    it('should render card mode when mode is set to tabs-card className', () => {
        cleanup(); // 清除
        wrapper = render(renderTestTabs(testTabsCardProps));
        tabsUlElement = wrapper.getByTestId('test-tab-ul');
        activeElement = wrapper.getByText('tab-3');
        renderChildElement = wrapper.getByText('this is tab three')
        expect(tabsUlElement).toHaveClass('tabs-card');
        expect(activeElement).toHaveClass('is-active');
        expect(renderChildElement).toBeInTheDocument();
    });
});