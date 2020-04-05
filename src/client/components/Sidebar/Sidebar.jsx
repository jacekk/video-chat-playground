import React from 'react'

import { Clients } from './Clients/Clients'
import { Controls } from './Controls/Controls'
import { Messages } from './Messages/Messages'

export const Sidebar = () => {
	return (
		<div className="sidebar">
			<Controls />
			<Clients />
			<Messages />
		</div>
	)
}
