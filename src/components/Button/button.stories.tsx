// Component Story Format (CSF模式) 这时候不能用中文名
// 所以采用下面的方式
import React from 'react'
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links';
import Button from './button';

// 定义一个个组件
const defaultButton = () => {
    return (
        <>
            <Button onClick={action('clicked')}> default button </Button>
            <Button disabled> disabled button </Button>
        </>
    );
}
// 不同的大小
const buttonWithSize = () => (
    <>
        <Button size="lg"> large button </Button>
        <Button size="sm"> small button </Button>
    </>
);
// 不同的type
const buttonWithType = () => (
    <>
        <Button> default button </Button>
        <Button btnType="primary"> primary button </Button>
        <Button btnType="danger"> danger button </Button>
        <Button btnType="link"> link button </Button>
    </>
);

// 定义title
storiesOf('Button Component', module)
    // .addDecorator(withInfo)
    // .addParameters({
    //     info: {
    //         // text参数, 还能支持md写法
    //         // ~~~js 这里可以写js代码  ~~~
    //         /* 
    //             ## this is a header
    //             ~~~js
    //                 const a = 'aaa';
    //             ~~~
    //         */
    //         text: `
    //             当前 Button Component 的配置和代码
    //         `,
    //         inline: true
    //     }
    // })
    // .addDecorator(CenterDecorator) // 局部装饰器(看全局)
    // * 使用js doc注释标准，这时候的每个案例的title要和组件名一样
    .add('Button', defaultButton)
    //                                          这里也能设置，而且优先级最高
    .add('不同size Button', buttonWithSize, { info: { inline: true } })
    .add('不同btnType Button', buttonWithType)
