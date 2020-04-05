import { useStoreState, useStoreActions } from 'easy-peasy'
import React from 'react'

import * as ACTIONS from '../../../../common/actionsTypes'

import './Controls.sass'

export const Controls = () => {
	const [messageText, setMessageText] = React.useState('')
	const sendMessage = useStoreActions((actions) => actions.serverConnection.sendMessage)
	const statusText = useStoreState((s) => s.serverConnection.statusText)
	const isConnectionOpen = useStoreState((s) => s.serverConnection.isEstablished)

	const submitForm = (msg) => {
		// @todo move this message creation into chat/messages substore
		sendMessage(
			JSON.stringify({
				type: ACTIONS.ACTION_TYPE__MESSAGE_CREATED,
				payload: msg,
			})
		)
	}

	const onInputChange = (ev) => {
		setMessageText(String(ev.target.value || '').trim())
	}

	const onSayHelloClick = () => {
		const randNumber = Math.ceil(Math.random() * 1e4)
		submitForm(`Hello ${randNumber}`)
	}

	const onFormSubmit = (ev) => {
		ev.preventDefault()
		ev.stopPropagation()
		submitForm(messageText)
		setMessageText('')
	}

	return (
		<div className="controls">
			<div className="controls__buttons">
				<form onSubmit={onFormSubmit}>
					<input value={messageText} onChange={onInputChange} placeholder="type anything..." />
				</form>
				<button type="button" disabled={!isConnectionOpen} onClick={onSayHelloClick}>
					Say hello
				</button>
			</div>
			<pre>{JSON.stringify({ statusText, isConnectionOpen }, null, 4)}</pre>
		</div>
	)
}
