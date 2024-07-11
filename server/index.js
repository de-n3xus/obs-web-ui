const express = require('express')

const app = express()

const port = 6166
app.use(express.static('../dist'))

app.get('*', (req, res) => {
	res.sendFile('../dist/index.html')
})

app.listen(port, '0.0.0.0', () => {
	console.log(`Listening on port ${port}`)
})
