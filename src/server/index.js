import fs from 'fs'
import http from 'https'
import path from 'path'
import { server } from 'websocket'

import { onWsRequest } from './websocket-request'
import { requestListener } from './server-request'

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
const wsServer = new server({ httpServer })

httpServer.listen(serverPort, onServerListen)
wsServer.on('request', onWsRequest)
