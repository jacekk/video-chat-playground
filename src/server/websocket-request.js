import * as uuid from 'uuid'

import * as ACTIONS from '../common/actionsTypes'

const MESSAGES_LIMIT = 3

// @todo dump messages into some storage every couple seconds
// @todo read messages from storage on init
let messages = []

let clients = []

const onMessageCreated = (requestClientId, payload) => {
	messages.push({
		clientId: requestClientId,
		content: payload,
		createdAt: Date.now(),
		messageId: uuid.v4(),
	})

	if (messages.length > MESSAGES_LIMIT) {
		messages.shift()
	}

	clients.forEach((client) => {
		const msg = JSON.stringify({
			payload: messages,
			type: ACTIONS.ACTION_TYPE__MESSAGES_UPDATE,
		})
		client.connection.send(msg)
	})
}

module.exports.onWsRequest = (request) => {
	const connection = request.accept() // NOT for production
	const requestClientId = uuid.v4()

	clients.forEach((client) => {
		client.connection.send(
			JSON.stringify({
				type: ACTIONS.ACTION_TYPE__CLIENT_IN,
				payload: {
					clientId: requestClientId,
					message: `${requestClientId} is in :)`,
					numOfClients: clients.length + 1,
				},
			})
		)
	})

	clients.push({ connection, id: requestClientId })

	connection.send(
		JSON.stringify({
			type: ACTIONS.ACTION_TYPE__CLIENT_CONNECTED,
			payload: {
				clientId: requestClientId,
				messages,
				numOfClients: clients.length,
			},
		})
	)

	connection.on('message', (message) => {
		const parsedAction = JSON.parse(message.utf8Data)

		console.log('onMessage', requestClientId, '-->', parsedAction.type, '-->', parsedAction.payload)

		switch (parsedAction.type) {
			case ACTIONS.ACTION_TYPE__MESSAGE_CREATED:
				onMessageCreated(requestClientId, parsedAction.payload)
				break
			default:
				return
		}
	})

	connection.on('close', () => {
		clients = clients.filter((client) => client.id !== requestClientId)

		const numOfClients = clients.length

		clients.forEach((client) => {
			client.connection.send(
				JSON.stringify({
					type: ACTIONS.ACTION_TYPE__CLIENT_OUT,
					payload: {
						clientId: requestClientId,
						message: 'I am out :)',
						numOfClients,
					},
				})
			)
		})
	})
}
