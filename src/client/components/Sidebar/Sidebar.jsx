import React from 'react'

import { Controls } from './Controls/Controls'
import { Messages } from './Messages/Messages'

export const Sidebar = () => {
	return (
		<div className="sidebar">
			<Controls />
			<Messages />
		</div>
	)
}
