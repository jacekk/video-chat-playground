const fs = require('fs')
const http = require('https')
const path = require('path')
const Server = require('websocket').server

const { onWsRequest } = require('./websocket-request')
const { requestListener } = require('./server-request')

const serverPort = 9876
const sslDir = path.resolve(`${__dirname}/../../ssl/`)
const serverOpts = {
	cert: fs.readFileSync(path.resolve(`${sslDir}/temp.cert`)),
	key: fs.readFileSync(path.resolve(`${sslDir}/temp.key`)),
}
const onServerListen = () => {
	console.log(`Server listening at https://localhost:${serverPort}`)
}
const httpServer = http.createServer(serverOpts, requestListener)
const wsServer = new Server({ httpServer })

httpServer.listen(serverPort, onServerListen)
wsServer.on('request', onWsRequest)
