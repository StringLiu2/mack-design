// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './styles/index.scss';
// import * as serviceWorker from './serviceWorker';
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
// 中转导出
export { default as Button } from './components/Button';
export { default as Alert } from './components/Alert';
export { default as Menu } from './components/Menu';
export { default as Tabs } from './components/Tabs';
export { default as Icon } from './components/Icon';
export { default as Transition } from './components/Transition';
export { default as Input } from './components/Input';
export { default as AutoComplete } from './components/AutoComplete';
export { default as Select } from './components/Select';
export { default as Progress } from './components/Progress';
export { default as Upload } from './components/Upload';
// 本地link测试的时候，使用 
// npm link ./test-mack-design/node_modules/react进行指定相同的react包和版本
// 发布到npm上
// npm whoami 查看是否登录了，报错就没有登录
// npm config ls 查看源，不能是淘宝的源
// npm adduser 进行登录
// npm publish 发布
// peerDependencies 标识告诉用户要安装这里面的
// package.json里面的scripts prepublishOnly 
// 是替换prepublish的，prepublish会在npm install or npm publish都运行 这样是不好的
