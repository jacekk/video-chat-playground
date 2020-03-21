import React from 'react'
import ReactDOM from 'react-dom'

const HelloMessage = (props) => {
	const rand = Math.ceil(Math.random() * 666)

	return (
		<div>
			Hello {props.name} {rand}
		</div>
	)
}

ReactDOM.render(<HelloMessage name="Jane" />, document.getElementById('app'))
