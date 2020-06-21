import React from 'react'
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import Menu from './menu';

const defaultMenu = () => (
    <Menu onSelect={action('selected MenuItem Component index')}>
        <Menu.Item>menu-1</Menu.Item>
        <Menu.Item>menu-2</Menu.Item>
        <Menu.Item>menu-3</Menu.Item>
    </Menu>
);

const modeMenu = () => (
    <>
        <br/>
        <h4>水平模式</h4>
        <br/>
        <Menu onSelect={action('horizontal mode Menu')}>
            <Menu.Item>menu-1</Menu.Item>
            <Menu.Item>menu-2</Menu.Item>
            <Menu.Item>menu-3</Menu.Item>
        </Menu>
        <br/>
        <h4>垂直模式</h4>
        <br/>
        <Menu mode="vertical" onSelect={action('vertical mode Menu')}>
            <Menu.Item>vertical menu-1</Menu.Item>
            <Menu.Item>vertical menu-2</Menu.Item>
            <Menu.Item>vertical menu-3</Menu.Item>
        </Menu>
    </>
);

const subMenuAndMenuItem = () => (
    <>
        <br/>
        <h4>水平模式</h4>
        <br/>
        <Menu onSelect={action('horizontal mode Menu')}>
            <Menu.Item>menu-1</Menu.Item>
            <Menu.Item>menu-2</Menu.Item>
            <Menu.SubMenu title="menu-3">
                <Menu.Item>menu-3-1</Menu.Item>
                <Menu.Item>menu-3-2</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item>menu-4</Menu.Item>
        </Menu>
        <br/>
        <h4>垂直模式</h4>
        <br/>
        <Menu mode="vertical" onSelect={action('horizontal mode Menu')}>
            <Menu.Item>vertical-menu-1</Menu.Item>
            <Menu.Item>vertical-menu-2</Menu.Item>
            <Menu.SubMenu title="vertical-menu-3">
                <Menu.Item>vertical-menu-3-1</Menu.Item>
                <Menu.Item>vertical-menu-3-2</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item>vertical-menu-4</Menu.Item>
        </Menu>
    </>
);

const otherMenu = () => (
    <>
        <br/>
        <Menu defaultIndex="4" onSelect={action('horizontal mode Menu')}>
            <Menu.Item>menu-1</Menu.Item>
            <Menu.Item disabled>menu-2(disabled)</Menu.Item>
            <Menu.SubMenu title="menu-3">
                <Menu.Item>menu-3-1</Menu.Item>
                <Menu.Item>menu-3-2</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item>menu-4(default active)</Menu.Item>
        </Menu>
        <br/>
        <h4>默认打开SubMenu演示</h4>
        <br/>
        <Menu defaultIndex="1" mode="vertical" onSelect={action('horizontal mode Menu')} defaultOpenSubMenus={['1']}>
            <Menu.Item>menu-1</Menu.Item>
            <Menu.SubMenu title="menu-2 default open">
                <Menu.Item>menu-2-1</Menu.Item>
                <Menu.Item>menu-2-2</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item index="333">menu-3(default index 333)</Menu.Item>
        </Menu>
    </>
);

storiesOf('Menu Component', module)
    .add('Menu', defaultMenu)
    .add('不同mode的Menu', modeMenu)
    .add('使用SubMenu的Menu', subMenuAndMenuItem)
    .add('其他配置的Menu', otherMenu)