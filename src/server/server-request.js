import * as uuid from 'uuid'

const isStartRoute = (req) => req.method.toLowerCase() === 'get' && req.url === '/start'

export const requestListener = (req, res) => {
	const host = String(req.headers.host || '')
	const hostname = host.split(':')[0] || 'localhost'

	if (!isStartRoute(req)) {
		res.writeHead(302, { Location: `https://${hostname}:9000` })

		return res.end()
	}

	res.writeHead(200, { 'Content-Type': 'text/html' })
	res.write(`Request ID: ${uuid.v4()}`)
	res.write('<br/><br/> d-_-b <br/><br/>')
	res.write('<a href=":9000">open client app</a>')

	return res.end()
}
