import React from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import { webSocketUrl } from '../constants'

import './Controls.sass'

export const Controls = () => {
	const [message, setMessage] = React.useState(null)
	const [sendMessage, lastMessage, readyState] = useWebSocket(webSocketUrl)
	const isConnectionOpen = ReadyState.OPEN === readyState

	const connectionStatus = {
		[ReadyState.CONNECTING]: 'Connecting',
		[ReadyState.OPEN]: 'Open',
		[ReadyState.CLOSING]: 'Closing',
		[ReadyState.CLOSED]: 'Closed',
	}[readyState]

	const onSayhelloClick = () => {
		const randNumber = Math.ceil(Math.random() * 1e4)
		const msg = `Hello times ${randNumber}!`
		sendMessage(msg)
	}

	React.useEffect(() => {
		if (!lastMessage) {
			return
		}

		setMessage(JSON.parse(lastMessage.data))
	}, [lastMessage])

	return (
		<div className="controls">
			<div className="controls__buttons">
				<button type="button" disabled={!isConnectionOpen} onClick={onSayhelloClick}>
					Say hello
				</button>
			</div>
			<pre>{JSON.stringify({ isConnectionOpen, readyState, connectionStatus, message }, null, 4)}</pre>
		</div>
	)
}
