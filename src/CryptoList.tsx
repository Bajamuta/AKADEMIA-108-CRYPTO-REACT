import React, {Component} from 'react';
import {Crypto} from "./App";

interface CryptoListProps {
    cryptos: Crypto[]
}

export default class CryptoList extends Component<any, any> {

    showCrypto = () => {
        return this.props.cruptos.map()
    }

    render() {
        return <div>
            <ol>
                {this.showCrypto()}
            </ol>
        </div>
    }
}
