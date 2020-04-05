import React from 'react'

import { Main } from '../components/Main/Main'
import { Sidebar } from '../components/Sidebar/Sidebar'

export const AppLayout = (props) => {
	return (
		<div className="app__layout">
			<main className="app__main">
				<Main />
			</main>
			<aside className="app__sidebar">
				<Sidebar />
			</aside>
		</div>
	)
}
