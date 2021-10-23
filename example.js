// Import the module
let client = require('./src/blankly_client')

// Set the base settings
client.setExchange('binance')
client.setKeys({'API_KEY': '***', 'API_SECRET': '***', 'API_PASS': '***'})
client.setSandbox(true)

let symbol = 'BTC-USDT'

/*
These two are commented out because they have incredibly long responses ~27k keys each
 */
// Show the account values
// client.getProducts(symbol).then(function (response) {
//     console.log("Products: ")
//     console.log(response.data)
// })

// client.getAccount().then(function (response) {
//     console.log("Account Values: ")
//     console.log(response.data)
// })

client.marketOrder(symbol, 'buy', .01).then(function (response) {
    console.log("Market Order: ")
    console.log(response.data)
})

client.limitOrder(symbol, 'buy', 60000, .01).then(function (response) {
    console.log("Limit Order ")
    console.log(response.data)
})

client.getOpenOrders(symbol).then(function (response) {
    console.log("Open Orders: ")
    console.log(response.data)
})

client.getOrder(symbol, 'b0f96ab0-1d1d-4a7b-9e83-af18b875f659').then(function (response) {
    console.log("Individual Order: ")
    console.log(response.data)
})

client.getFees().then(function (response) {
    console.log("Fees: ")
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

