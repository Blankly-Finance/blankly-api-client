// Import the module
let client = require('./src/blankly_client')

// Set the base settings
client.setExchange('coinbase_pro')  // supports "coinbase_pro" "alpaca" or "binance"

let symbol = 'BTC-USD'

client.getProducts(symbol).then(function (response) {
    console.log("Products: ")
    console.log(response.data)
})

client.getProductHistory(symbol, Date.now()/1000-(3600*24*60), Date.now()/1000, 3600).then(function (response) {
    console.log("History: ")
    console.log(response.data)
})

client.getOrderFilter(symbol).then(function (response) {
    console.log("Filter: ")
    console.log(response.data)
})

client.getPrice(symbol).then(function (response) {
    console.log("Price: ")
    console.log(response.data)
})

