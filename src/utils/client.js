import OBSWebSocket from "obs-websocket-js"
import config from "../config.js"
import { toast } from "vue-sonner"

const obs = new OBSWebSocket()
let isConnected = false;

(async () => {
	if (!isConnected) {
		await obs.connect(config.host, config.password.toString(), {
			rpcVersion: 1,
		}).catch(error => {
			console.error(error)
		})

		isConnected = true
	}
})()

obs.on('ConnectionClosed', () => {
	isConnected = false
	toast.error("Connection closed")
})

obs.on('ConnectionError', error => {
	console.error(error)
	toast.error('An error occurred. Check console for more details.')
})

export default obs
