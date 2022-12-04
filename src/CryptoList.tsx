import React, {Component} from 'react';
import {CryptoCurrency} from "./interfaces";

interface CryptoListProps {
    cryptos: CryptoCurrency[]
}

export default class CryptoList extends Component<CryptoListProps, any> {

    showCrypto = () => {
        return this.props.cryptos.map((item: CryptoCurrency) => {
            return <li key={item.symbol}>
                <span className="CryptoLabel">Last rate: </span>
                <span className={`CryptoRate ${item.status}`}>{item.last} </span>
                <span className="CryptoName">[BTC/{item.symbol}]</span>
            </li>
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
