const http = require('https')
const pem = require('pem')
const Server = require('websocket').server

const { onRequest } = require('./request')

const serverPort = 9876

const onServerListem = () => {
	console.log(`Server listening at port ${serverPort}`)
}

const onCreateCertificate = (err, pemResult) => {
	if (err) {
		throw err
	}

	const serverOpts = {
		cert: pemResult.certificate,
		key: pemResult.serviceKey,
	}
	const httpServer = http.createServer(serverOpts, () => {})
	const wsServer = new Server({ httpServer })

	httpServer.listen(serverPort, onServerListem)
	wsServer.on('request', onRequest)
}

pem.createCertificate({ days: 1, selfSigned: true }, onCreateCertificate)
