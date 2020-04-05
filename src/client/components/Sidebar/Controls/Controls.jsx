import { useStoreState, useStoreActions } from 'easy-peasy'
import React from 'react'

import * as ACTIONS from '../../../../common/actionsTypes'

import './Controls.sass'

export const Controls = () => {
	const [messageText, setMessageText] = React.useState('')
	const sendMessage = useStoreActions((actions) => actions.serverConnection.sendMessage)
	const statusText = useStoreState((s) => s.serverConnection.statusText)
	const isConnectionOpen = useStoreState((s) => s.serverConnection.isEstablished)

	const onInputChange = (ev) => {
		setMessageText(String(ev.target.value || '').trim())
	}

	const onSayHelloClick = () => {
		const randNumber = Math.ceil(Math.random() * 1e4)

		sendMessage(
			JSON.stringify({
				// @todo move this message creation into chat/messages substore
				type: ACTIONS.ACTION_TYPE__MESSAGE_CREATED,
				payload: [`Hello times ${randNumber}!`, messageText].filter(Boolean).join(' / '),
			})
		)
	}

	return (
		<div className="controls">
			<div className="controls__buttons">
				<button type="button" disabled={!isConnectionOpen} onClick={onSayHelloClick}>
					Say hello
				</button>
				<input value={messageText} onChange={onInputChange} />
			</div>
			<pre>{JSON.stringify({ statusText, isConnectionOpen }, null, 4)}</pre>
		</div>
	)
}
