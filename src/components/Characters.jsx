import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Coin from './Coin'

const Characters = () => {

    const [coins, setCoins] = useState([])
    const [search, setSeacrh] = useState('')

    useEffect(()=>{
        setInterval(()=>{
            axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(res =>{
                setCoins(res.data);
            })
        },1000)
    },[]);

    const handleChange = e =>{
        setSeacrh(e.target.value)
    }

    const filteredCoins = coins.filter(coin=>coin.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="coin-app">
            <div className="coin-search">
                <h1 className="coin-text">Search a Currency</h1>
                <form>
                    <input 
                    type="text" 
                    placeholder="Search" 
                    className="coin-input"
                    onChange={handleChange}></input>
                </form>
            </div>
            {filteredCoins.map(coin=>{
                return(
                    <Coin 
                    key={coin.id} 
                    name={coin.name} 
                    image={coin.image}
                    symbol={coin.symbol}
                    volume={coin.market_cap}
                    price={coin.current_price}
                    >
                    </Coin>
                )
            })}
        </div>
    ) 
}

export default Characters


