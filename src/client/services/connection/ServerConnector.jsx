import { useStoreActions } from 'easy-peasy'
import React from 'react'
import useWebSocket from 'react-use-websocket'

import { webSocketUrl } from '../../constants'

export const ServerConnector = (props) => {
	const webSockerOptions = React.useMemo(
		() => ({
			//Will attempt to reconnect on all close events, such as server shutting down.
			shouldReconnect: () => true,
		}),
		[]
	)

	const serverConnectionActions = useStoreActions((s) => s.serverConnection)
	const [sendMessage, lastMessage, readyState] = useWebSocket(webSocketUrl, webSockerOptions)

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

		console.log('ServerConnector | lastMessage', lastMessage.data)
		// @todo dispatch action and listen on certain stores with some filtering
	}, [lastMessage])

	return null
}
