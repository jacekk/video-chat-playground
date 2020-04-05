import { actionOn } from 'easy-peasy'

import * as actionTypes from '../../../common/actionsTypes'
import { mapServerAction } from '../utils'

export const chatClients = {
	numOfClients: 0,
	// listeners
	onMessageUpdate: actionOn(
		(_actions, storeActions) => [storeActions.serverConnection.onServerMessage],
		(state, target) => {
			const serverAction = mapServerAction(target.payload)

			switch (serverAction.type) {
				case actionTypes.ACTION_TYPE__CLIENT_IN:
				case actionTypes.ACTION_TYPE__CLIENT_CONNECTED:
				case actionTypes.ACTION_TYPE__CLIENT_OUT:
					if (Number.isInteger(serverAction.payload.numOfClients)) {
						state.numOfClients = serverAction.payload.numOfClients
					} else {
						state.numOfClients = 0
					}
					break
			}
		}
	),
}
