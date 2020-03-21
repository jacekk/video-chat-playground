import React from 'react'

import { AppVideo } from './AppVideo'
import { Controls } from './Controls'

import './App.sass'

export const App = () => {
	return (
		<div className="app">
			<div className="app__controls">
				<Controls />
			</div>
			<div className="app__video">
				<AppVideo />
			</div>
		</div>
	)
}
