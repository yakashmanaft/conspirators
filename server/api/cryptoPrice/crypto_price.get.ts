const apiKey = 'NJUrpRDFZ7yTJ5qnvVF9AG4BJ125DdnkuTML83NCyYdDQV93jkcMaRa7i45NaGCh';  
const apiSecret = 'IQp3vz2OV6k5OOkimg4mIRWMeRubyG9xUeohTYFXgBpUHjFl1NGVFSvHjtpSOJyJ'; 

import Binance from 'node-binance-api';  
  
const binance = new Binance().options({  
    // APIKEY: process.env.BINANCE_API_KEY,  
    // APISECRET: process.env.BINANCE_API_SECRET  
    APIKEY: apiKey,  
    APISECRET: apiSecret 
}); 

export default defineEventHandler(async () => {
    // ... Do whatever you want here
    // return await binance.prices('BTCRUB', (error, ticker) => {  
    //     console.info("Цена BTC: " + ticker.BTCRUB);  
    // }); 
    return await binance.prices()
    // return await binance.bookTickers()
  })