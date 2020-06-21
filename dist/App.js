import React, { useState, useEffect } from 'react';
import axios from 'axios';
import globalStyle from './styles/global.module.scss';
function App() {
    var _a = useState(''), title = _a[0], setTitle = _a[1];
    useEffect(function () {
        axios.get('https://jsonplaceholder.typicode.com/posts/1')
            .then(function (res) {
            setTitle(res.data.title);
        });
    });
    return (React.createElement("div", { className: globalStyle.global },
        React.createElement("h2", null, title)));
}
export default App;
