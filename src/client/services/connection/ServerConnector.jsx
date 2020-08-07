import { useStoreActions } from 'easy-peasy'
import React from 'react'
import useWebSocket from 'react-use-websocket'

import { webSocketUrl } from '../../constants'

export const ServerConnector = (props) => {
	const webSockerOptions = {
		//Will attempt to reconnect on all close events, such as server shutting down.
		shouldReconnect: () => true,
	}

	const serverConnectionActions = useStoreActions((s) => s.serverConnection)
	const { sendMessage, lastMessage, readyState } = useWebSocket(webSocketUrl, webSockerOptions)

	React.useEffect(() => {
		serverConnectionActions.enable(sendMessage)

		return () => {
			serverConnectionActions.disable()
		}
	}, [])

	React.useEffect(() => {
		serverConnectionActions.setStatus(readyState)
	}, [readyState])

	React.useEffect(() => {
		if (!lastMessage) {
			return
		}

		serverConnectionActions.onServerMessage(lastMessage.data)
	}, [lastMessage])

	return null
}
