import { useStoreState } from 'easy-peasy'
import React from 'react'

const formatCreatedAt = (asNumber) => new Date(asNumber).toLocaleString()

export const Messages = () => {
	const messages = useStoreState((s) => s.chatMessages.items)

	return (
		<div>
			<strong>Messages:</strong>
			<ul>
				{messages.map((item) => (
					<li key={item.messageId}>
						{formatCreatedAt(item.createdAt)} || {item.content}
					</li>
				))}
			</ul>
		</div>
	)
}
