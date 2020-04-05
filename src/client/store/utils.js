export const isServerAction = (payload, actionType) => {
	try {
		const parsed = JSON.parse(payload)

		return parsed.type === actionType
	} catch (err) {
		console.error(`Failed to parse server action --> ${payload}`)
	}

	return false
}

export const mapServerAction = (payload) => {
	try {
		const parsed = JSON.parse(payload)

		return parsed
	} catch (err) {
		console.error(`Failed to parse server action --> ${payload}`)
	}

	return null
}
