let axios = require('axios');
let assert = require('assert')
let utils = require('./utils')

let settings = {
    keys: undefined,
    exchange: undefined,
    sandbox: undefined,
    binanceTLD: 'us',
    baseURL: 'http://localhost:3000'
}


// Example request
let req = {
    'exchange': 'coinbase_pro',
    'auth': {
        'API_KEY': "******************************",
        "API_SECRET": "*********************************************************************************",
        "API_PASS": "**********"
    },
    'command': 'get_account',
    'args': {},
    'sandbox': true,
    'binance_tld': 'us',
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
        method: 'get',
        url: '/',
        data: {
            exchange: settings.exchange,
            auth: settings.keys,
            sandbox: settings.sandbox,
            binance_tld: settings.binanceTLD,
            command: command,
            args: args
        }
    })
}

/*
Setter descriptions w/ checks to allow better checks for the settings
 */
function setKeys(keys, exchange=undefined) {
    /*
    Pass a keys object to set up the blankly client

    Optionally add the exchange string as 'coinbase_pro' 'binance' or 'alpaca' to check the required keys

    Currently this validates inputs for testing purposes
    */
    if (exchange !== undefined) {
        if (exchange === 'coinbase_pro') {
            assert(keys.hasOwnProperty('API_KEY'))
            assert(keys.hasOwnProperty('API_SECRET'))
            assert(keys.hasOwnProperty('API_PASS'))
        } else if (exchange === 'binance' || exchange === 'alpaca') {
            assert(keys.hasOwnProperty('API_KEY'))
            assert(keys.hasOwnProperty('API_SECRET'))
        } else {
            return new Error('Exchange not found.')
        }
    }
    settings.keys = keys
}

function setExchange(exchange) {
    let valid = false
    if (exchange === 'coinbase_pro' || exchange === 'binance' || exchange === 'alpaca') {
        settings.exchange = exchange
    } else {
        return new Error('Exchange not found.')
    }
}

function setSandbox(sandboxStatus) {
    if (sandboxStatus === true || sandboxStatus === false) {
        settings.sandbox = sandboxStatus
    } else {
        throw new Error("Invalid sandbox setting - must be bool")
    }
}

function setBinanceTLD(newTLD) {
    if (typeof newTLD === "string") {
        settings.binanceTLD = newTLD
    } else {
        throw new Error("Binance TLD must be one of \'us\' or \'com\'")
    }
}

function setBaseURL(newBaseURL) {
    if (typeof newBaseURL === "string") {
        settings.binanceTLD = newBaseURL
    } else {
        throw new Error("New base URL must be a string")
    }
}

async function getAccount(symbol = undefined) {
    return send('get_account', {'symbol': symbol})
}

module.exports.setKeys = setKeys
module.exports.setExchange = setExchange
module.exports.setSandbox = setSandbox
module.exports.setBinanceTLD = setBinanceTLD
module.exports.setBaseURL = setBaseURL
module.exports.getAccount = getAccount
