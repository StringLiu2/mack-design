import React, { useState } from 'react';
// font-awesome使用方式1
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faAmbulance } from '@fortawesome/free-solid-svg-icons';

import globalStyle from './styles/global.module.scss';
import Button from './components/Button/button';
import Alert from './components/Alert/alert';
import Menu from './components/Menu/menu';
import Tabs from './components/Tabs/tabs';
import Icon from './components/Icon/icon';
import Transition from './components/Transition/transition';

function App() {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className={globalStyle.global}>
      <Button autoFocus onClick={e => alert('点击了')} className="custom">Hello</Button>
      <Button disabled>Hello</Button>
      <Button btnType='primary' size='lg'>Hello</Button>
      <Button btnType='danger' size='sm'>Hello</Button>
      <Button target="_blank" btnType='link' href="https://www.baidu.com">baidu link</Button>
      <Button btnType='link' href="https://www.baidu.com" disabled>baidu link</Button>
      <hr />
      <Alert title="this is alert!"></Alert>
      <Alert title="this is alert!" isClose={false}></Alert>
      <Alert onClose={e => {
        // 自己干掉自己
        alert('我把自己干掉了');
      }} type='danger' title="this is alert!">
        这是主题内容
      </Alert>
      <Alert type='success' title="this is alert!">
        这是主题内容
      </Alert>
      <Alert type='warning' title="this is alert!">
        这是主题内容
      </Alert>
      <hr />
      <Menu
        defaultIndex="3"
        onSelect={index => alert(`切换到第${index}个`)}
        mode="vertical"
      // defaultOpenSubMenus={['3']}
      >
        <Menu.Item>cool link</Menu.Item>
        <Menu.Item disabled>cool link 2</Menu.Item>
        <Menu.SubMenu title="下拉菜单">
          <Menu.Item>菜单</Menu.Item>
          <Menu.Item>菜单 2</Menu.Item>
          <Menu.Item>菜单 3</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item>cool link 3</Menu.Item>
      </Menu>
      <hr />
      <Tabs onSelect={currentIndex => console.log(currentIndex)}>
        <Tabs.Item label={
          <span>
            <FontAwesomeIcon icon={faCoffee} />
          Card 1
          </span>
        }>
          <Button size="lg" onClick={() => setShow(!show)}> Toggle </Button>
          <Transition in={show} timeout={300} animation="zoom-in-left">
            <div>
              <p>
                Edit <code> src/App.tsx </code> and save to reload.
              </p>
              <p>
                Edit <code> src/App.tsx </code> and save to reload.
              </p>
              <p>
                Edit <code> src/App.tsx </code> and save to reload.
              </p>
              <p>
                Edit <code> src/App.tsx </code> and save to reload.
              </p>
            </div>
          </Transition>
          <Transition in={show} timeout={300} animation="zoom-in-left" wrapper={true}>
            <Button btnType="primary">wrapper包裹一下，然后不会和已经有的transition冲突</Button>
          </Transition>
        </Tabs.Item>
        <Tabs.Item label={
          <span>
            <FontAwesomeIcon icon={faAmbulance} />
            Card 2
          </span>
        } disabled>this is card two</Tabs.Item>
        <Tabs.Item label={
          <span>
            <Icon icon="chair" theme="primary" />
            Card 3
          </span>
        }>this is card three</Tabs.Item>
      </Tabs>
    </div>
  );
}

export default App;
