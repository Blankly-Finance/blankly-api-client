<br />

<div align="center">
   <img style="margin: 0 auto; padding-bottom: 15px; padding-top: 30px" width=70%" src="https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/blankly-github-logo.png?alt=media&token=8f436cd2-3d28-432c-867a-afef780f4260">
</div>
<br />
<div align="center">
  <b>💨  Rapidly connect & trade across exchanges through the blankly cloud  🚀</b>
</div>

<br />

## Blankly Order API Documentation

Hi, welcome to the Blankly API client for order execution. This details the routes & arguments as well as response details for each command. All commands are routed through the `/` endpoint:

### Example Query `get_account` at the `/` route:

```json
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
    'binance_tld': 'us', // Only required when using binance
}
```

The client provides async wrappers to rapidly construct these objects & modify settings.

