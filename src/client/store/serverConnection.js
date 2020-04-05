import { action, computed } from 'easy-peasy'
import { ReadyState } from 'react-use-websocket'

export const statusMapping = {
	[ReadyState.CLOSED]: 'Closed',
	[ReadyState.CLOSING]: 'Closing',
	[ReadyState.CONNECTING]: 'Connecting',
	[ReadyState.OPEN]: 'Open',
}

export const serverConnection = {
	status: ReadyState.CLOSED,
	connectionSendMessage: null,
	// computed
	statusText: computed((state) => statusMapping[state.status]),
	isEstablished: computed((state) => state.status === ReadyState.OPEN),
	// actions
	setStatus: action((state, readyState) => {
		state.status = readyState
	}),
	sendMessage: action((state, payload) => {
		if (!state.isEstablished) {
			throw new Error('ServerConnection has NOT been established.')
		}
		if (!state.connectionSendMessage) {
			throw new Error('"serverConnection" store "connectionSendMessage" is not set.')
		}

		state.connectionSendMessage(payload)
	}),
	disable: action((state) => {
		state.connectionSendMessage = null
	}),
	enable: action((state, connectionSendMessage) => {
		state.connectionSendMessage = connectionSendMessage
	}),
	onServerMessage: action(() => {
		// Do nothing. Works as a listener in other substores.
	}),
}
