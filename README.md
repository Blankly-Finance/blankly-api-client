<br />

<div align="center">
   <img style="margin: 0 auto; padding-bottom: 15px; padding-top: 30px" width=70%" src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blankly-github-logo.png?alt=media&token=8f436cd2-3d28-432c-867a-afef780f4260">
</div>
<br />

<div align="center">
  <b>💨  Rapidly connect & trade across exchanges through the blankly cloud  🚀</b>
</div>

<br />

# Blankly Order API Documentation

Hi, welcome to the Blankly API client for order execution. This details the routes & arguments as well as response details for each command. All commands are routed through the `/` endpoint:

### Example Query `get_account` at the `/` route:

```python
{
    'exchange': 'coinbase_pro',
    'auth': {
        'API_KEY': "******************************",
        "API_SECRET": "*********************************************************************************",
        "API_PASS": "**********"
    },
    'command': 'get_account',
    'args': {},
    'sandbox': true,
    'binance_tld': 'us', # Only required when using binance
}
```

The client provides async wrappers to rapidly construct these objects & modify settings.

## Demo API

Currently the API runs in a demo mode, always enforcing `sandbox: true`. The `API_KEY` tags are checked for in the query but overriden with our own sandbox keys.

# Client Functions

### `getProducts()`

Get all trading pairs currently on the exchange.

#### Response

```python
[
  {
    "symbol": "BTC-USD",
    "base_asset": "BTC",
    "quote_asset": "USD",
    "base_min_size": 0.0001,
    "base_max_size": 280,
    "base_increment": .01
  },
    ...
]
```

| Key            | Description                                                  | Type  |
| -------------- | ------------------------------------------------------------ | ----- |
| symbol         | The currency pair of this exchange's products                | str   |
| base_asset     | The base asset in the trading pair                           | str   |
| quote_asset    | The quote asset in the trading pair                          | str   |
| base_min_size  | Smallest amount of base currency that can be bought on the exchange | float |
| base_max_size  | Largest amount of base currency that can be bought on the exchange | float |
| base_increment | The finest resolution the base currency can be ordered in    | float |

### `getAccount(symbol=None)`

Gets the current account holdings if symbol is None, otherwise will return the symbol holdings. If passed in a specific symbol, it will attempt to get the base asset ('BTC-USD' as symbol will give you 'BTC').

#### Arguments

| Arg    | Description                                                  | Examples       | Type |
| ------ | ------------------------------------------------------------ | -------------- | ---- |
| symbol | Optionally fill with a specific account value to filter for. This should be a base asset. | "BTC" or "USD" | str  |

#### Response

If `symbol='BTC'`:

```python
{
  "available": 2.3,
  "hold": 0.2
}
```

‌If `symbol=None`:

```python
"BTC": {
  "available": 2.3,
  "hold": 0.2
},
"USD": {
  "available": 4352,
  "hold": 23
}
```

| Key                      | Description                                                  | Type  |
| ------------------------ | ------------------------------------------------------------ | ----- |
| `BTC` or `USD` (example) | Currency or asset this account is associated with            | str   |
| available                | Amount of account asset that is free to be placed on orders or sold | float |
| hold                     | Amount of account asset that is currently on orders, or generally unavailable | float |

### `marketOrder(symbol, side, size)`

Create a new live market order.

#### Arguments

| Arg    | Description                                                  | Examples               | Type  |
| ------ | ------------------------------------------------------------ | ---------------------- | ----- |
| symbol | Identifier for the product to order                          | "BTC-USD" or "XLM-EUR" | str   |
| side   | Buy or sell your position                                    | "buy" or "sell"        | str   |
| size   | Amount of **base** to buy or sell. This means "BTC" or "EUR." Buying .01 "BTC-USD" would have args: ("BTC-USD", "buy", .01). | 1.2 or .01             | float |

#### Response

```python
{
  symbol: 'BTC-USDT',
  status: 'filled',
  type: 'market',
  side: 'buy',
  id: '8980151',
  created_at: 1634998470.738,
  size: 0.01,
}
```

### `limitOrder(symbol, side, price, size)`

Create a new live limit order on your exchange.

#### Arguments

| Arg    | Description                                                  | Examples               | Type  |
| ------ | ------------------------------------------------------------ | ---------------------- | ----- |
| symbol | Identifier for the product to order                          | "BTC-USD" or "XLM-EUR" | str   |
| side   | Create a buy or sell position                                | "buy" or "sell"        | str   |
| price  | Price to place the order at. In general, be careful to place your order on the correct side of the order book | 32000 or 15000         | float |
| size   | Amount of **base** to buy or sell. This means "BTC" or "XLM." Note that this is opposite of market order, which uses funds.<br />Buying 2.3 bitcoin at 20k dollars would have args: ("BTC-USD", "buy", 20000, 2.3) | 2.3 or .001            | float |

#### Response

```python
{
  'symbol': 'BTC-USDT',
  'price': 60000,
  'status': 'open',
  'type': 'limit',
  'side': 'buy',
  'id': '8980693',
  'created_at': 1634998603111,
  'size': 0.01,
  'time_in_force': 'GTC'
}
```

### `cancelOrder(symbol, orderId)`

Cancel a particular order.

#### Arguments

| Arg     | Description                                                  | Examples                             | Type |
| ------- | ------------------------------------------------------------ | ------------------------------------ | ---- |
| symbol  | The identifier for the product to order                      | "BTC-USD" or "XLM-USD"               | str  |
| orderId | The exchange-given unique identifier for the order. This can be found using an `order` object. With `.get_id()` | b6d2f951-dae0-89e8-3e79-b460b1e9eead | str  |

#### Response

```python
{
  "order_id": "b6d2f951-dae0-89e8-3e79-b460b1e9eead"
}
```

| Key      | Description                  | Type |
| -------- | ---------------------------- | ---- |
| order_id | The id of the canceled order | str  |

### `getOpenOrders(symbol=None)`

Get a full list of open orders.

#### Arguments

| Key    | Description                                                 | Examples               | type |
| ------ | ----------------------------------------------------------- | ---------------------- | ---- |
| symbol | Optionally fill with an identifier for the product to order | "BTC-USD" or "XLM-USD" | str  |

### Response

```python
[
  {
    'id': 'dfa936a4-ea8b-4dbf-bb99-b2b632a5370a', 
    'price': 10000.0, 
	'size': 1.0, 
    'symbol': 'BTC-USD', 
    'side': 'buy', 
    'type': 'limit', 
    'status': 'open'
  },
  ...
]
```

| Key    | Description                                                  | Type  |
| ------ | ------------------------------------------------------------ | ----- |
| id     | Exchange-specific order identifier                           | str   |
| price  | Price the limit is set at                                    | float |
| size   | Size of the limit (in base currency)                         | float |
| symbol | Identifier for the product the order is on                   | str   |
| side   | Describes if the order is buying or selling                  | str   |
| type   | Open orders can be "market," "limit," or "stop." This shows which of those types is valid. | str   |
| status | Order status can be "open" "pending" or "closed"             | str   |

### `getOrder(symbol, orderId)`

Get info about a particular order. If the objects returned by placing orders are saved, this function shouldn't need to be used.

#### Arguments

| Arg     | Description                                                  | Examples                             | Type |
| ------- | ------------------------------------------------------------ | ------------------------------------ | ---- |
| symbol  | The identifier for the product to order                      | "BTC-USD" or "XLM-USD"               | str  |
| orderId | The exchange-given unique identifier for the order. This can be found using an `order` object. With `.get_id()` | b6d2f951-dae0-89e8-3e79-b460b1e9eead | str  |

#### Response

```python
{
  'id': 'dfa936a4-ea8b-4dbf-bb99-b2b632a5370a', 
  'price': 10000.0, 
  'size': 1.0, 
  'symbol': 'BTC-USD', 
  'side': 'buy', 
  'type': 'limit', 
  'status': 'open'
}
```

| Key    | Description                                                  | Type  |
| ------ | ------------------------------------------------------------ | ----- |
| id     | Exchange-specific order identifier                           | str   |
| price  | Price the limit is set at                                    | float |
| size   | Size of the limit (in base currency)                         | float |
| symbol | Identifier for the product the order is on                   | str   |
| side   | Describes if the order is buying or selling                  | str   |
| type   | Open orders can be "market," "limit," or "stop." This shows which of those types is valid | str   |
| status | Order status can be "open" "pending" or "closed"             | str   |

### `getFees()`

Get the maker and taker fee rates of a particular exchange.

#### Response

```python
{
  "maker_fee_rate": 0.0050,
  "taker_fee_rate": 0.0050
}
```

| Key            | Description                           | Type  |
| -------------- | ------------------------------------- | ----- |
| maker_fee_rate | Exchange maker fee rate. (89% = 0.89) | float |
| taker_fee_rate | Exchange taker fee rate. (89% = 0.89) | float |

### `get_product_history(symbol, epochStart, epochStop, resolution)`

Download historical data with rows of *at least* `time (epoch seconds)`, `low`', `high`, `open`, `close`, `volume` as columns.

### Arguments

| Arg         | Description                                                  | Examples               | Type       |
| ----------- | ------------------------------------------------------------ | ---------------------- | ---------- |
| symbol      | The identifier for the product to order                      | "BTC-USD" or "XLM-USD" | str        |
| epoch_start | Starting download time in epoch                              | 1591389962             | float      |
| epoch_stop  | Ending download time in epoch                                | 1622925962             | float      |
| resolution  | Resolution in seconds in each candle (ex: 60 = 1 per minute, 3600 = 1 per hour) | 3600                   | str or int |

#### Response

JSON string with columns `open`, `high`, `low`, and `close`. Each repeated key number is part of the same row.

```python
{
  "time": {
    "0": 1633064400,
    "1": 1633068000,
    "2": 1633071600,
    "3": 1633075200,
    "4": 1633078800,
    "5": 1633082400,
  },
  "low": {
    "0": 43292.96,
    "1": 39977.15,
    "2": 9000.0,
    "3": 40782.46,
    "4": 42270.2,
    "5": 44780.28,
  },
  "high": {
    "0": 43854.7,
    "1": 44036.24,
    "2": 70000.0,
    "3": 49356.24,
    "4": 50000.0,
    "5": 49999.92,
  },
  "open": {
    "0": 43811.2,
    "1": 43850.33,
    "2": 43993.98,
    "3": 44789.52,
    "4": 44945.81,
    "5": 44901.5,
  },
  "close": {
    "0": 43848.66,
    "1": 43995.1,
    "2": 44789.52,
    "3": 45116.48,
    "4": 44886.12,
    "5": 47090.73,
  },
  "volume": {
    "0": 2.256374,
    "1": 14.547997,
    "2": 72.533733,
    "3": 98.349979,
    "4": 98.346201,
    "5": 35.125009,
  }
}
```

### `getOrderFilter(symbol)`

Find the limits that the exchange puts on purchases for a specific asset.

#### Arguments

| Arg    | Description                             | Examples               | Type |
| ------ | --------------------------------------- | ---------------------- | ---- |
| symbol | The identifier for the product to order | "BTC-USD" or "XLM-USD" | str  |

#### Response

```python
{
  'symbol': 'BTC-USD',
  'base_asset': 'BTC',
  'quote_asset': 'USD',
  'max_orders': 1000000000000,
  'limit_order': {
    'base_min_size': 0.001,
    'base_max_size': 10000.0,
    'base_increment': 1e-08,
    'price_increment': 0.01,
    'min_price': 0.01,
    'max_price': 9999999999
  },
  'market_order': {
    'fractionable': True,
    'base_min_size': 0.001,
    'base_max_size': 10000.0,
    'base_increment': 1e-08,
    'quote_increment': 0.01,
    'buy': {
      'min_funds': 10.0,
      'max_funds': 1000000.0
    },
    'sell': {
      'min_funds': 10.0,
      'max_funds': 1000000.0
    }
  }
}
```

| Key             | Description                                                  | Type  |
| --------------- | ------------------------------------------------------------ | ----- |
| symbol          | The order filter that the query represents                   | str   |
| base_asset      | The base asset of this market                                | str   |
| quote_asset     | The quote asset of this market                               | str   |
| max_orders      | The maximum number of orders that the exchange allows on a currency pair | int   |
| base_min_size   | The minimum size to buy of base                              | float |
| base_max_size   | The maximum amount of base currency to buy                   | float |
| base_increment  | The resolution of the base increment when placing orders     | float |
| price_increment | The resolution that can be used when setting a limit price   | float |
| min_price       | The minimum limit price that can be set                      | float |
| max_price       | The maximum price that the limit can be set                  | float |
| fractionable    | Does the market order allow orders to be placed that are less than one of the base asset | bool  |
| quote_increment | The resolution of the quote currency when placing orders     | float |
| min_funds       | The minimum funds allowed when placing a market order        | float |
| max_funds       | The maximum funds allowed when placing a market order        |       |

### `getPrice(symbol)`

Get the quoted price of the trading pair.

### Arguments

| Arg    | Description                             | Examples               | Type |
| ------ | --------------------------------------- | ---------------------- | ---- |
| symbol | The identifier for the product to order | "BTC-USD" or "XLM-USD" | str  |

#### Response

- Returns a `float` which is the price of the trading pair, such as `53000` or `35000`.

