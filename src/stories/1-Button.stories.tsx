import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
// Component Story Format (CSF模式)
// 定义标题和对应的组件，这是一个个storybook
export default {
  title: 'Button-Test',
  component: Button
};

// 每个storybook下面的一个个列表项(其实就是一个个书签)，返回的是一个个组件，点出触发会在下面action
export const Text = () => (
  <Button onClick={action('clicked')}>Hello Button</Button>
);

export const Emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);
export const myButton = () => (
  <Button onClick={action('log my Button')}> this is my Button ! </Button>
);
