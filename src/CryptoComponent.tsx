import React, {Component, useState} from 'react';
import CryptoList from "./CryptoList";
import axios, {AxiosResponse} from "axios";
import {CryptoCurrency, ResponseData} from "./interfaces";

interface CryptoProps {
}

interface CryptoState {
    initCryptos: CryptoCurrency[],
    cryptos: CryptoCurrency[],
    filter: string
}

export default class CryptoComponent extends Component<CryptoProps, CryptoState> {

    _input: HTMLInputElement | null;

    constructor(props: CryptoProps) {
        super(props);
        this._input = null;
        this.state = {
            initCryptos: [],
            cryptos: [],
            filter: ''
        }
    }

    filterCurrency = (arg: string | undefined) => {
        if (arg?.trim()) {
            this.setState((state: CryptoState) => {
                let filteredCryptos = state.initCryptos.filter(
                    (item: CryptoCurrency) => item.symbol === arg
                );
                return ({
                    cryptos: filteredCryptos
                });
            })
        }
        else {
           this.setState((state: CryptoState) => {
               return ({
                   cryptos: state.initCryptos
               })
           })
        }
    }

    componentDidMount() {
        this.getCryptoData();
    }

    compareStatus(prev: number, current: number) {
        let result = 'still';
        if (prev > current) result = 'down';
        else if (prev < current) result = 'up';
        return result;
    }

    getCryptoData = () => {
        axios.get('https://blockchain.info/ticker').then(
            (response: AxiosResponse) => {
                const newCryptos = Object.entries(response.data).map(
                    ([currency, data], index, array) => {
                        const val = data as ResponseData;
                        const previousObj = this.state.initCryptos.find(
                            (item: CryptoCurrency) => item.symbol === val.symbol
                        );
                        if (previousObj)
                        {
                            return {
                                status: this.compareStatus(previousObj.last, val.last),
                                ...val
                            } as CryptoCurrency
                        }
                        return {
                            status: 'still',
                            ...val
                        } as CryptoCurrency;
                    }
                );
                this.setState({
                    initCryptos: newCryptos
                });
                this.filterCurrency(this.state.filter);
            }
        );
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
            <CryptoList cryptos={this.state.cryptos}/>
        </main>
    }
}
