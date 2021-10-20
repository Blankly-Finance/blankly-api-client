// Import the module
let client = require('./src/blankly_client')

// Set the base settings
client.setExchange('coinbase_pro')
client.setKeys({'API_KEY': '***', 'API_SECRET': '***', 'API_PASS': '***'})
client.setSandbox(true)

// Show the account values
client.getProducts('BTC-USD').then(function (response) {
    console.log(response.data)
})
