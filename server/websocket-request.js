const uuid = require('uuid')

let clients = []

module.exports.onWsRequest = (request) => {
	const connection = request.accept() // NOT for production
	const requestClientId = uuid.v4()

	clients.forEach((client) => {
		client.connection.send(
			JSON.stringify({
				client: requestClientId,
				text: 'I am now connected',
			})
		)
	})

	clients.push({ connection, id: requestClientId })

	connection.on('message', (message) => {
		console.log('onMessage', requestClientId, '-->', message.utf8Data)
		clients
			.filter((client) => client.id !== requestClientId)
			.forEach((client) =>
				client.connection.send(
					JSON.stringify({
						client: requestClientId,
						text: message.utf8Data,
					})
				)
			)
	})

	connection.on('close', () => {
		clients = clients.filter((client) => client.id !== requestClientId)

		clients.forEach((client) =>
			client.connection.send(
				JSON.stringify({
					client: requestClientId,
					text: 'I disconnected',
				})
			)
		)
	})
}
