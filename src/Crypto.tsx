import React, {Component} from 'react';
import CryptoList from "./CryptoList";
import axios from "axios";

interface CryptoProps {

}

export default class Crypto extends Component<CryptoProps, any> {

    render() {
        return <main>
            <input type="text" ref={}/>
            <CryptoList/>
        </main>
    }
}
