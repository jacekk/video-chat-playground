import { useStoreState } from 'easy-peasy'
import React from 'react'

export const Clients = () => {
	const state = useStoreState((s) => s.chatClients)

	return (
		<div>
			<strong>Clients:</strong>
			<pre>{JSON.stringify(state, null, 4)}</pre>
		</div>
	)
}
