import React, {useState} from 'react';
import './App.css';
import CryptoComponent from "./CryptoComponent";

export interface CryptoCurrency {
    id: number,
    name: string,
    value: number
}

function App() {


  return (
    <div>
      <header>
       Crypto Rate
      </header>
        <CryptoComponent/>
    </div>
  );
}

export default App;
