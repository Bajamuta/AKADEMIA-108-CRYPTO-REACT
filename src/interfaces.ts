export interface ResponseData {
    "15m": number,
    last: number,
    buy: number,
    sell: number,
    symbol: string
}

export interface CryptoCurrency extends ResponseData{
    status: 'up' | 'down' | 'still'
}
