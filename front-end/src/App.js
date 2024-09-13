import React, { useEffect } from 'react';

import './App.css';
function App() {
  const handleConnectServer = async () => {
    const response = await fetch('http://localhost:8080/');
    const result = await response.json();
    console.log(result);
    console.log('first')
  };
  useEffect(() => {
    handleConnectServer();
  }, []);

  return <div className="App"></div>;
}

export default App;
