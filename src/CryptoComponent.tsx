import React, {Component} from 'react';
import CryptoList from "./CryptoList";
import axios, {AxiosResponse} from "axios";
import {CryptoCurrency, ResponseData} from "./interfaces";
import './CryptoComponent.css';

interface CryptoProps {
}

interface CryptoState {
    initCryptos: CryptoCurrency[],
    cryptos: CryptoCurrency[],
    filter: string,
    timer: any
}

export default class CryptoComponent extends Component<CryptoProps, CryptoState> {

    _input: HTMLInputElement | null;

    constructor(props: CryptoProps) {
        super(props);
        this._input = null;
        this.state = {
            initCryptos: [],
            cryptos: [],
            filter: '',
            timer: null
        };
    }

    filterCurrency = (arg: string | undefined) => {
        if (arg?.trim()) {
            this.setState((state: CryptoState) => {
                let filteredCryptos = state.initCryptos.filter(
                    (item: CryptoCurrency) => item.symbol === arg
                );
                return ({
                    cryptos: filteredCryptos,
                    filter: arg
                });
            })
        }
        else {
           this.setState((state: CryptoState) => {
               return ({
                   cryptos: state.initCryptos,
                   filter: ''
               })
           })
        }
    }

    componentDidMount() {
        this.getCryptoData();
        this.setState({timer: setInterval(() => this.getCryptoData(), 1000)})
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
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
            </form>
            <CryptoList cryptos={this.state.cryptos}/>
        </main>
    }
}
