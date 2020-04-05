import { server } from 'websocket'
import chalk from 'chalk'
import fs from 'fs'
import http from 'https'
import path from 'path'

import { onWsRequest } from './websocket-request'
import { requestListener } from './server-request'

const serverPort = 9876
const sslDir = path.resolve(`${__dirname}/../../ssl/`)
const serverOpts = {
	cert: fs.readFileSync(path.resolve(`${sslDir}/temp.cert`)),
	key: fs.readFileSync(path.resolve(`${sslDir}/temp.key`)),
}
const onServerListen = () => {
	const startUrl = `https://localhost:${serverPort}/start`
	const coloredUrl = chalk.greenBright.bgBlack.bold(` ${startUrl} `)

	console.log(`Visit ${coloredUrl} to play with the server.`)
}
const httpServer = http.createServer(serverOpts, requestListener)
const wsServer = new server({ httpServer })

httpServer.listen(serverPort, onServerListen)
wsServer.on('request', onWsRequest)
