import React, { useState, useEffect } from 'react';
import axios from 'axios'
import globalStyle from './styles/global.module.scss';


function App() {
  const [title, setTitle] = useState('');
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(res => {
      setTitle(res.data.title);
    })
  })
  return (
    <div className={globalStyle.global}>
        <h2>{title}</h2>
    </div>
  );
}

export default App;
