import React, {useState} from 'react';
import logo from './logo.svg'; // https://commons.wikimedia.org/wiki/File:Bitcoin.svg
import './App.css';
import CryptoComponent from "./CryptoComponent";

function App() {
  return (
    <div>
      <header>
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Crypto Rate</h1>
      </header>
        <CryptoComponent/>
    </div>
  );
}

export default App;
