const fs = require('fs')
const http = require('https')
const path = require('path')
const Server = require('websocket').server

const { onRequest } = require('./request')

const serverPort = 9876
const sslDir = path.resolve(`${__dirname}/../ssl/`)

const serverOpts = {
	cert: fs.readFileSync(path.resolve(`${sslDir}/temp.cert`)),
	key: fs.readFileSync(path.resolve(`${sslDir}/temp.key`)),
}

const onServerListem = () => {
	console.log(`Server listening at port ${serverPort}`)
}

const httpServer = http.createServer(serverOpts, () => {})
const wsServer = new Server({ httpServer })

httpServer.listen(serverPort, onServerListem)
wsServer.on('request', onRequest)
