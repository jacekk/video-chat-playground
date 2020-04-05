import { action, actionOn } from 'easy-peasy'

import * as actionTypes from '../../../common/actionsTypes'
import { mapServerAction } from '../utils'

export const chatMessages = {
	items: [],
	add: action((state, payload) => {
		state.items.push(payload)
	}),
	clear: action((state) => {
		state.items = []
	}),
	// listeners
	onMessageUpdate: actionOn(
		(_actions, storeActions) => [storeActions.serverConnection.onServerMessage],
		(state, target) => {
			const serverAction = mapServerAction(target.payload)

			switch (serverAction.type) {
				case actionTypes.ACTION_TYPE__MESSAGES_UPDATE:
					state.items = serverAction.payload
					break
			}
		}
	),
}
