axios = require('axios');

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

axios.defaults.baseURL = 'http://localhost:3000'

axios({
    method: 'get',
    url: '/',
    data: req
}).then((response) => {
    console.log(JSON.stringify(response.data))
})