import { action, computed } from 'easy-peasy'
import { ReadyState } from 'react-use-websocket'

const defaultSendMessage = () => {
	throw new Error('ServerConnection has NOT been established.')
}

export const statusMapping = {
	[ReadyState.CLOSED]: 'Closed',
	[ReadyState.CLOSING]: 'Closing',
	[ReadyState.CONNECTING]: 'Connecting',
	[ReadyState.OPEN]: 'Open',
}

export const serverConnection = {
	status: ReadyState.CLOSED,
	sendMessage: defaultSendMessage,
	// computed
	statusText: computed((state) => statusMapping[state.status]),
	isEstablished: computed((state) => state.status === ReadyState.OPEN),
	// actions
	setStatus: action((state, readyState) => {
		state.status = readyState
	}),
	disable: action((state) => {
		state.sendMessage = defaultSendMessage
	}),
	enable: action((state, sendMessage) => {
		state.sendMessage = sendMessage
	}),
}
