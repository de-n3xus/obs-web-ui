# Installation

Before you need install https://github.com/obsproject/obs-websocket

Then put your access data to obs websocket to src/config.js

```js
export default {
	host: 'ws://192.168.43.58:4455',
	password: 123123,
}
```

If you want open this on second device in your network, open cmd and type `ipconfig`

Then take IPv4 Address, in my situation this is 192.168.43.58 and put it in config
