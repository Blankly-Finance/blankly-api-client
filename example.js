let client = require('./src/blankly_client')

client.setExchange('coinbase_pro')
client.setKeys({'API_KEY': '***', 'API_SECRET': '***', 'API_PASS': '***'})
client.setSandbox(true)

client.getAccount().then(function (response) {
    console.log(response.data.result)
})