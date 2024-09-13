import React, { useEffect, useState } from 'react';

import './App.css';
function App() {

  const [text, setText] = useState('');

  const handleConnectServer = async () => {
    const response = await fetch('http://localhost:8080/');
    const result = await response.json();
    setText(result);
  };

  useEffect(() => {
    handleConnectServer();
  }, []);

  return <div className="App"></div>;
}

export default App;
