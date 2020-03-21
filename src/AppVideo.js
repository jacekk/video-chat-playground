import { useWindowSize } from '@react-hook/window-size'
import React from 'react'
import useDimensions from 'react-use-dimensions'

import './AppVideo.sass'
import { videoElementId, heigherVideoClassName } from './constants'

const getUserMedia = async () => window.navigator.mediaDevices.getUserMedia({ video: true, audio: false })

const didMountAsync = async () => {
	const videoElem = document.getElementById(videoElementId)

	try {
		const stream = await getUserMedia()

		videoElem.srcObject = stream
		videoElem.play()
	} catch (err) {
		alert(err)
	}
}

const adjustVideoElement = (windowDims, videoDims) => {
	const [windowWidth, windowHeight] = windowDims
	const windowRatio = windowWidth / windowHeight
	const videoRatio = videoDims.height / videoDims.width
	const videoClasses = document.getElementById(videoElementId).classList

	if (isNaN(videoRatio)) {
		return
	}

	if (windowRatio > videoRatio) {
		videoClasses.add(heigherVideoClassName)
	} else {
		videoClasses.remove(heigherVideoClassName)
	}
}

export const AppVideo = () => {
	const windowDims = useWindowSize()
	const [videoRef, videoDims] = useDimensions()

	React.useEffect(() => {
		didMountAsync(videoDims, windowDims)
	}, [])

	React.useEffect(() => {
		adjustVideoElement(windowDims, videoDims)
	}, [...windowDims, videoDims.width, videoDims.height])

	return (
		<div className="app-video-wrapper">
			<video ref={videoRef} id={videoElementId} autoPlay></video>
		</div>
	)
}
