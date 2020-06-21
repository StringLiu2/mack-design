import React from 'react'
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import Tabs from './tabs';

const defaultTabs = () => (
    <Tabs onSelect={action(`current index change`)}>
        <Tabs.Item label="选项卡-1">
            this is tabs one
        </Tabs.Item>
        <Tabs.Item label="选项卡-2">
            this is tabs two
        </Tabs.Item>
        <Tabs.Item label="选项卡-3">
            this is tabs three
        </Tabs.Item>
    </Tabs>
);

const defaultIndexTabs = () => (
    <Tabs defaultIndex="2" onSelect={action(`current index change`)}>
        <Tabs.Item label="选项卡-1">
            this is tabs one
        </Tabs.Item>
        <Tabs.Item label="选项卡-2">
            this is tabs two
        </Tabs.Item>
        <Tabs.Item label="选项卡-3">
            this is tabs three
        </Tabs.Item>
    </Tabs>
);

const itemDifferentPropsTabs = () => (
    <Tabs onSelect={action(`current index change`)}>
        <Tabs.Item label="选项卡-1">
            this is tabs one
        </Tabs.Item>
        <Tabs.Item label="选项卡-2(disabled)" disabled>
            this is tabs two
        </Tabs.Item>
        <Tabs.Item label={<code>custom label</code>}>
            this is custom TabItem Component the label props，use code tag.
        </Tabs.Item>
    </Tabs>
);

const modeTabs = () => (
    <>
        <br />
        <h3>选项卡模式</h3>
        <br />
        <Tabs mode="tab">
            <Tabs.Item label="选项卡-1">
                this is tabs one
            </Tabs.Item>
            <Tabs.Item label="选项卡-2">
                this is tabs two
            </Tabs.Item>
            <Tabs.Item label="选项卡-3">
                this is tabs three
            </Tabs.Item>
        </Tabs>
        <br />
        <hr />
        <br />
        <h3>卡片模式</h3>
        <br/>
        <Tabs mode="card">
            <Tabs.Item label="卡片-1">
                this is card one
            </Tabs.Item>
            <Tabs.Item label="卡片-2">
                this is card two
            </Tabs.Item>
            <Tabs.Item label="卡片-3">
                this is card three
            </Tabs.Item>
        </Tabs>
    </>
);
storiesOf('Tabs Component', module)
    .add('Tabs', defaultTabs)
    .add('默认选中index的Tabs', defaultIndexTabs)
    .add('不同Props的TabItem', itemDifferentPropsTabs)
    .add('不同mode的Tabs', modeTabs)