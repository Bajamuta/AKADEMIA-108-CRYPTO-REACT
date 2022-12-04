import React, {Component, useState} from 'react';
import CryptoList from "./CryptoList";
import axios from "axios";
import {CryptoCurrency} from "./App";

interface CryptoProps {
}

export default class CryptoComponent extends Component<CryptoProps, any> {

    _input: HTMLInputElement | null;

    _initCrypto: CryptoCurrency[] = [
        {
            id: 0, name: "PLN", value: 123
        }
    ];

    _cryptos: CryptoCurrency[];

    constructor(props: CryptoProps) {
        super(props);
        this._input = null;
        this._cryptos = this._initCrypto;
    }

    filterCurrency = (arg: string | undefined) => {
        if (arg) {
            this._cryptos = this._initCrypto.filter((item) => item.name === arg);
        }
    }

    componentDidMount() {

    }

    render() {
        return <main>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (this._input)
                {
                    this.filterCurrency(this._input.value)
                }
            }}>
                <input placeholder="Enter currency name" type="text" ref={(data) => { this._input = data} }/>
                <button type="submit">Filtruj</button>
            </form>;
            <CryptoList cryptos={this._cryptos}/>
        </main>
    }
}
