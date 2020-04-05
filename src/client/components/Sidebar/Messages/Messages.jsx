import { useStoreState } from 'easy-peasy'
import React from 'react'

export const Messages = () => {
	const messages = useStoreState((s) => s.chatMessages.items)

	return (
		<div>
			<strong>Messages:</strong>
			<pre>{JSON.stringify(messages, null, 4)}</pre>
		</div>
	)
}
