import React from 'react'

import { useWayfinder } from '../contexts/wayfinder'
import { Button, Overlay } from './layout'

export const Targets = () => {
	const [state, send] = useWayfinder()

	const targets = ['lars', 'anna', 'birk', 'tuva']

	const mapToButton = target => ({
		desc: `target ${target}`,
		onClick: () => send('SELECT', { target: target }),
		key: `select-${target}`
	})

	return (
		<Overlay toggle={state.matches('idle')}>
			{targets.map(mapToButton).map(target => (
				<Button {...target} />
			))}
		</Overlay>
	)
}
