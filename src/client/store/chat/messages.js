import { action } from 'easy-peasy'

export const chatMessages = {
	items: [],
	add: action((state, payload) => {
		state.items.push(payload)
	}),
	clear: action((state) => {
		state.items = []
	}),
}
