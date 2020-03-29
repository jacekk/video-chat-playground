import React from 'react'

import { AppVideo } from './AppVideo'
import { Controls } from './Controls'

import './App.sass'

export const App = () => {
	return (
		<div className="app">
			<main className="app__main">
				<AppVideo />
			</main>
			<aside className="app__sidebar">
				<Controls />
			</aside>
		</div>
	)
}
