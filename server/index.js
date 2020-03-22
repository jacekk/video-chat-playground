const http = require('http')
const Server = require('websocket').server

const { onRequest } = require('./request')

const serverPort = 9876
const httpServer = http.createServer(() => {})

httpServer.listen(serverPort, () => {
	console.log(`Server listening at port ${serverPort}`)
})

const wsServer = new Server({ httpServer })

wsServer.on('request', onRequest)
