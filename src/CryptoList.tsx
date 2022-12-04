import React, {Component} from 'react';
import {CryptoCurrency} from "./App";

interface CryptoListProps {
    cryptos: CryptoCurrency[]
}

export default class CryptoList extends Component<CryptoListProps, any> {

    showCrypto = () => {
        return this.props.cryptos.map((item: CryptoCurrency) => {
            return <li key={item.id}>
                <span className="CryptoLabel">Last rate: </span>
                <span className="CryptoRate">{item.value} </span>
                <span className="CryptoName">BTC/{item.name}</span>
            </li>;
        })
    }

    render() {
        return <div className="CryptoList">
            <ul>
                {this.showCrypto()}
            </ul>
        </div>
    }
}
