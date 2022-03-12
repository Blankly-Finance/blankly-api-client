let axios = require('axios');
let utils = require('./utils')

let settings = {
    exchange: undefined,
    baseURL: 'https://connect.blankly.finance',
}


// Example request
let req = {
    'exchange': 'coinbase_pro',
    'command': 'get_account',
    'args': {},
}

async function send(command, args) {
    Object.keys(settings).forEach((key => {
        if (settings[key] === undefined) {
            throw new Error("Settings value is undefined for: " + key)
        }
    }))
    args = utils.removeUndef(args)

    axios.defaults.baseURL = settings.baseURL

    return axios({
        method: 'post',
        url: '/',
        data: {
            exchange: settings.exchange,
            command: command,
            args: args
        }
    })
}

function setExchange(exchange) {
    if (exchange === 'coinbase_pro' || exchange === 'binance' || exchange === 'alpaca') {
        settings.exchange = exchange
    } else {
        return new Error('Exchange not found.')
    }
}

function setBaseURL(newBaseURL) {
    if (typeof newBaseURL === "string") {
        settings.binanceTLD = newBaseURL
    } else {
        throw new Error("New base URL must be a string")
    }
}

function setDemo (demoStatus) {
    if (demoStatus === true || demoStatus === false) {
        settings.demo = demoStatus
    } else {
        throw new Error("Invalid sandbox setting - must be bool")
    }
}

async function getProducts() {
    return send('get_products', {})
}

async function getAccount(symbol = undefined) {
    return send('get_account', {'symbol': symbol})
}

async function marketOrder(symbol, side, size) {
    return send('market_order', {'symbol': symbol, 'side': side, 'size': size})
}

async function limitOrder(symbol, side, price, size) {
    return send('limit_order', {'symbol': symbol, 'side': side, 'price': price, 'size': size})
}

async function cancelOrder(symbol, orderID) {
    return send('cancel_order', {'symbol': symbol, order_id: orderID})
}

async function getOpenOrders(symbol = undefined) {
    return send('get_open_orders', {'symbol': symbol})
}

async function getOrder(symbol, orderID) {
    return send('get_order', {'symbol': symbol, order_id: orderID})
}

async function getFees() {
    return send('get_fees', {})
}

async function getProductHistory(symbol, epochStart, epochStop, resolution) {
    return send('get_product_history', {'symbol': symbol, epoch_start: epochStart, epoch_stop:
                                                       epochStop, 'resolution': resolution})
}

async function getOrderFilter(symbol) {
    return send('get_order_filter', {'symbol': symbol})
}

async function getPrice(symbol) {
    return send('get_price', {'symbol': symbol})
}


module.exports.setExchange = setExchange
module.exports.setBaseURL = setBaseURL
module.exports.setDemo = setDemo


module.exports.getProducts = getProducts
module.exports.getAccount = getAccount
module.exports.marketOrder = marketOrder
module.exports.limitOrder = limitOrder
module.exports.cancelOrder = cancelOrder
module.exports.getOpenOrders = getOpenOrders
module.exports.getOrder = getOrder
module.exports.getFees = getFees
module.exports.getProductHistory = getProductHistory
module.exports.getOrderFilter = getOrderFilter
module.exports.getPrice = getPrice
