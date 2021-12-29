
import axios from 'axios';

import { storageService } from './storageService.js';
// import { utilService } from './utilService.js';

export const BitcoinService = {
    getRate,
    getMarketPrice,
    getTradeVolume
}

async function getRate(coins) {
    try {
        const res = await axios.get(
            `https://blockchain.info/tobtc?currency=USD&value=${coins}`
        );
        return Promise.resolve(res.data);
    } catch (err) {
        Promise.reject('Error in getRate (BitcoinService)');
    }
}

async function getMarketPrice() {
    const STORAGE_KEY = 'marketPriceData';
    try {
        var chartProperties = storageService.load(STORAGE_KEY);
        if (chartProperties) return chartProperties;
        else {
            const res = await axios.get(
                `https://api.blockchain.info/charts/market-price?timespan=1months&format=json&cors=true`
            );
            chartProperties = res.data;
            storageService.store(STORAGE_KEY, chartProperties);
            return Promise.resolve(chartProperties);
        }
    } catch (err) {
        Promise.reject('Error in getMarketPrice (BitcoinService)');
    }
}

async function getTradeVolume() {
    const STORAGE_KEY = 'tradeVolumeData';
    try {
        var chartProperties = storageService.load(STORAGE_KEY);
        if (chartProperties) return chartProperties;
        else {
            const res = await axios.get(
                `https://api.blockchain.info/charts/trade-volume?timespan=1months&format=json&cors=true`
            );
            chartProperties = res.data;
            storageService.store(STORAGE_KEY, chartProperties);
            return Promise.resolve(chartProperties);
        }
    } catch (err) {
        Promise.reject('Error in getMarketPrice (BitcoinService)');
    }
}





// function getEmptyChart() {
//     return {
//         title: '',
//         data: null,
//         description: '',
//         color: utilService.getRandomColor()
//     }
// }

