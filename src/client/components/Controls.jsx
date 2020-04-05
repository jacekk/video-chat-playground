import { useStoreState } from 'easy-peasy'
import React from 'react'

import './Controls.sass'

export const Controls = () => {
	const statusText = useStoreState((s) => s.serverConnection.statusText)
	const isConnectionOpen = useStoreState((s) => s.serverConnection.isEstablished)

	const onSayHelloClick = () => {
		const randNumber = Math.ceil(Math.random() * 1e4)

		console.log('Controls | randNumber', randNumber)
		// sendMessage(
		// 	JSON.stringify({
		// 		type: ACTIONS.ACTION_TYPE__MESSAGE_CREATED,
		// 		payload: `Hello times ${randNumber}!`,
		// 		// payload: `John says hello`, // @todo
		// 	})
		// )
	}

	return (
		<div className="controls">
			<div className="controls__buttons">
				<button type="button" disabled={!isConnectionOpen} onClick={onSayHelloClick}>
					Say hello
				</button>
			</div>
			<pre>{JSON.stringify({ statusText, isConnectionOpen }, null, 4)}</pre>
		</div>
	)
}
