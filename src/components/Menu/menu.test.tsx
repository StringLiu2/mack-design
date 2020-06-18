import React from 'react';
import { render, RenderResult, fireEvent, cleanup, wait } from '@testing-library/react';
import Menu, { MenuProps } from './menu';

const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
}
const testVerProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <Menu.Item>
                active
            </Menu.Item>
            <Menu.Item disabled>
                disabled
            </Menu.Item>
            <Menu.Item>
                xyz
            </Menu.Item>
            <Menu.SubMenu title="sub menu" className='drop1'>
                <Menu.Item>sub menu1</Menu.Item>
                <Menu.Item>sub menu2</Menu.Item>
            </Menu.SubMenu>
            {/* 添加的不是MenuItem，直接不渲染了，还提示了console.error */}
            {/* <li>hello</li> */}
        </Menu>
    );
}
const createStyleFile = () => {
    const cssFile: string = `
        .submenu {
            display: none;
        }
        .submenu.menu-opened {
            display: block;
        }
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = cssFile;
    return style;
}

let wrapper: RenderResult,
    menuElement: HTMLElement,
    activeElement: HTMLElement,
    disabledElement: HTMLElement;

describe('test Menu and MenuItem component', () => {
    beforeEach(() => {
        wrapper = render(generateMenu(testProps));
        // 插入css样式
        wrapper.container.append(createStyleFile());
        // 通过data-testid的值拿到节点
        menuElement = wrapper.getByTestId('test-menu');
        activeElement = wrapper.getByText('active');
        disabledElement = wrapper.getByText('disabled');
    });
    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('menu test');
        // expect(menuElement.getElementsByTagName('li').length).toBe(6);
        // :scope伪类选择器，表示当前这个
        expect(menuElement.querySelectorAll(':scope>li').length).toBe(4);
        expect(activeElement).toHaveClass('menu-item is-active');
        expect(disabledElement).toHaveClass('menu-item is-disabled');
    });
    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('xyz'); // 拿到要点击的那个元素
        expect(thirdItem).toHaveClass('menu-item');
        fireEvent.click(thirdItem);
        expect(thirdItem).toHaveClass('is-active');
        expect(activeElement).not.toHaveClass('is-active');
        // 调用了第n + 1项
        expect(testProps.onSelect).toHaveBeenCalledWith('2');
        fireEvent.click(disabledElement); // 然后点击被禁用的按钮
        expect(disabledElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
    });
    it('should render vertical mode when mode is set to vertical className', () => {
        cleanup(); // 把之前render的组件清掉
        wrapper = render(generateMenu(testVerProps)); // mode='vertical'
        menuElement = wrapper.getByTestId('test-menu');
        expect(menuElement).toHaveClass('menu-vertical');
    });
    it('should show dropdown items when hover on subMenu', async () => {
        // 默认没有出现 添加动画后，直接没有渲染，等动画之后才渲染
        // expect(wrapper.queryByText('sub menu1')).not.toBeVisible();
        // expect(wrapper.queryByText('sub menu2')).not.toBeVisible();
        // 通过title获取
        const titleElement = wrapper.getByText('sub menu');
        // 鼠标移上去
        fireEvent.mouseEnter(titleElement);
        // 这里用了300毫秒的定时器，所以用异步
        await wait(() => {
            expect(wrapper.queryByText('sub menu1')).toBeVisible();
            expect(wrapper.queryByText('sub menu2')).toBeVisible();
        });
        // 点击里面的第一项，触发onSelect方法
        fireEvent.click(wrapper.getByText('sub menu1'));
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
        // 鼠标移出
        fireEvent.mouseLeave(titleElement);
        await wait(() => {
            expect(wrapper.queryByText('sub menu1')).not.toBeVisible();
            expect(wrapper.queryByText('sub menu2')).not.toBeVisible();
        });
    });
    it('should show dropdown items when click on subMenu, meantime li the is-vertical className , open SubMenu add is-opened className', () => {
        cleanup(); // 把render的清掉
        wrapper = render(generateMenu(testVerProps));
        // 插入css样式
        wrapper.container.append(createStyleFile());
        // 默认没有出现 添加动画后，直接没有渲染，等动画之后才渲染
        // expect(wrapper.queryByText('sub menu1')).not.toBeVisible();
        // expect(wrapper.queryByText('sub menu2')).not.toBeVisible();
        const titleElement = wrapper.getByText('sub menu');
        // 点击后出现
        fireEvent.click(titleElement);
        expect(wrapper.queryByText('sub menu1')).toBeVisible();
        expect(wrapper.queryByText('sub menu2')).toBeVisible();
        // 打开了SubMenu父组件有这两个className
        expect(titleElement.parentElement).toHaveClass('is-vertical is-opened');
        // 点击里面的第一项，触发onSelect方法
        const subMenuChild = wrapper.getByText('sub menu1');
        fireEvent.click(subMenuChild);
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
        expect(subMenuChild).toHaveClass('is-active'); // 选中的样式
        // 再点击一下消失
        fireEvent.click(titleElement);
        // 关闭之后没有is-opened属性，同时两个MenuItem组件都不显示了
        expect(titleElement.parentElement).toHaveClass('is-vertical');
        expect(titleElement.parentElement).not.toHaveClass('is-opened');

        expect(wrapper.queryByText('sub menu1')).not.toBeVisible();
        expect(wrapper.queryByText('sub menu2')).not.toBeVisible();
    })
    it('should MenuItem is active when click on MenuItem not call onSelect', () => {
        fireEvent.click(activeElement);
        // 第一个点击后没有调用
        expect(testProps.onSelect).not.toHaveBeenCalledWith("0");
    });
});