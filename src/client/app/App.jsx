import { StoreProvider } from 'easy-peasy'
import React from 'react'

import { store } from '../store'
import { ServerConnector } from '../services/connection/ServerConnector'

import { AppLayout } from './AppLayout'
import './App.sass'

export const App = () => (
	<StoreProvider store={store}>
		<AppLayout />
		<ServerConnector />
	</StoreProvider>
)
