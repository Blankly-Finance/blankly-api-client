let exchanges = ['coinbase_pro', 'binance', 'alpaca']
const assert = require('assert')
const expect = require('expect.js')

// Import the module
let client = require('../src/blankly_client')

// Set the base settings
client.setExchange('coinbase_pro')
client.setKeys({'API_KEY': '***', 'API_SECRET': '***', 'API_PASS': '***'})
client.setSandbox(true)


function confirmValidResult(resp) {
    if (resp.hasOwnProperty('result')) {
        expect(true).to.equal(true)
    } else {
        throw new Error("Failure on exchange " + exchanges[i] + " with response " + resp)
    }
}


describe('Client', function() {
    describe('#get_account', function() {
        it('should return account values', async () => {
            for (let i = 0; i<exchanges.length; i++) {
                client.setExchange(exchanges[i])
                let resp = (await client.getAccount()).data
                confirmValidResult(resp)
            }
        })
    })
    describe('#get_products', function() {
        it('should return all available symbols', async () => {
            for (let i = 0; i<exchanges.length; i++) {
                client.setExchange(exchanges[i])
                let resp = (await client.getProducts()).data
                confirmValidResult(resp)
            }
        })
    })
    describe('#get_fees', function() {
        it('should return fees for the exchange', async () => {
            for (let i = 0; i<exchanges.length; i++) {
                client.setExchange(exchanges[i])
                let resp = (await client.getFees()).data
                confirmValidResult(resp)
            }
        })
    })
})