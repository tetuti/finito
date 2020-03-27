import React from 'react'
import { Canvas } from 'react-three-fiber'

import { useWayfinder } from '../contexts/wayfinder'
import { Box } from './layout'
import { format } from '../utils'

export const TrackingError = () => {
	return (
		<strong>
			No location found{' '}
			<span role="img" aria-label="sad face">
				😢
			</span>
		</strong>
	)
}

export const TrackingLoading = () => {
	const [state] = useWayfinder()
	const { context } = state

	return (
		<p>
			<strong>{`Finding location of ${context.target}`}</strong>
		</p>
	)
}

export const TrackingSuccess = () => {
	const [state] = useWayfinder()
	const { context } = state

	return (
		<>
			<p>
				<strong>{context.target}</strong>
				<em className="code">{` @ ${context.lastFetch}`}</em>
			</p>
			<em className="code">{`x: ${format(context.location.x)}`}</em>
			<em className="code">{`y: ${format(context.location.y)}`}</em>
			<div className="canvas-wrapper">
				<Canvas>
					<ambientLight />
					<pointLight position={[10, 10, 10]} />
					<Box
						position={[
							context.location.x,
							context.location.y,
							context.location.z
						]}
					/>
				</Canvas>
			</div>
		</>
	)
}
