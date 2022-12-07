import React, {Component, useEffect, useRef, useState} from 'react';
import CryptoList from "./CryptoList";
import axios, {AxiosResponse} from "axios";
import {CryptoCurrency, ResponseData} from "./interfaces";
import './CryptoComponent.css';

/*interface CryptoProps {
}

interface CryptoState {
    initCryptos: CryptoCurrency[],
    cryptos: CryptoCurrency[],
    filter: string
}*/

/*export default class CryptoComponent extends Component<CryptoProps, CryptoState> {

    _input: HTMLInputElement | null;
    _timer: any;

    constructor(props: CryptoProps) {
        super(props);
        this._input = null;
        this._timer = null;
        this.state = {
            initCryptos: [],
            cryptos: [],
            filter: ''
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
        this._timer = setInterval(() => this.getCryptoData(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this._timer);
    }

    compareStatus = (prev: number, current: number) => {
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
}*/

export default function CryptoComponent() {

    const _input = useRef<HTMLInputElement>(null);
    let _timer: ReturnType<typeof setInterval>;

    // very important to set the type of Array!
    const [initCryptos, setInitCryptos] = useState<CryptoCurrency[]>([]);
    const [cryptos, filterCryptos] = useState<CryptoCurrency[]>([]);
    const [filter, setFilter] = useState('');

    const filterCurrency = (arg: string | undefined) => {
        if (arg?.trim()) {
            filterCryptos(() => {
                return initCryptos.filter(
                    (item: CryptoCurrency) => item.symbol === arg
                );
            });
            setFilter(() => arg);
        }
        else {
            filterCryptos(() => {
                return initCryptos;
            });
            setFilter(() => '');
        }
    }

    const compareStatus = (prev: number, current: number) => {
        let result = 'still';
        if (prev > current) result = 'down';
        else if (prev < current) result = 'up';
        return result;
    }

    const getCryptoData = () => {
        axios.get('https://blockchain.info/ticker').then(
            (response: AxiosResponse) => {
                const newCryptos = Object.entries(response.data).map(
                    ([currency, data], index, array) => {
                        const val = data as ResponseData;
                        const previousObj = initCryptos.find(
                            (item: CryptoCurrency) => item.symbol === val.symbol
                        );
                        if (previousObj)
                        {
                            return {
                                status: compareStatus(previousObj.last, val.last),
                                ...val
                            } as CryptoCurrency
                        }
                        return {
                            status: 'still',
                            ...val
                        } as CryptoCurrency;
                    }
                );
                setInitCryptos((prev) => newCryptos);
                filterCurrency(filter);
            }
        );
    };

    // similar do componentDidMount and componentDidUpdate
    useEffect(() => {
        getCryptoData();
        _timer = setInterval(() => getCryptoData(), 5000);

        // instead of componentWillUnmount etc.
        return function cleanup() {
            clearInterval(_timer);
        }
    }, []);
    // second argument is for array of arguments where this effect has to occur

    return <main>
        <form onSubmit={(e) => {
            e.preventDefault();
            if (_input)
            {
                filterCurrency(_input.current?.value)
            }
        }}>
            <input placeholder="Enter currency name" type="text" ref={_input}/>
            <button type="submit">Filtruj</button>
        </form>
        <CryptoList cryptos={cryptos}/>
    </main>
}
