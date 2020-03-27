import React from 'react'

import { useWayfinder } from '../contexts/wayfinder'
import { Button, Footer } from './layout'

export const Actions = () => {
	const [state, send] = useWayfinder()
	const { value } = state

	const actions = {
		REFRESH: {
			desc: 'refresh',
			onClick: () => send('REFRESH'),
			key: 'refresh'
		},
		SUBSCRIBE: {
			desc: 'subscribe',
			onClick: () => send('SUBSCRIBE'),
			key: 'subscribe',
			style: 'continuous'
		},
		UNSUBSCRIBE: {
			desc: 'unsubscribe',
			onClick: () => send('UNSUBSCRIBE'),
			key: 'unsubscribe',
			style: 'danger'
		},
		RESET: {
			desc: 'reset',
			onClick: () => send('RESET'),
			key: 'reset',
			style: 'danger'
		},
		RETRY: {
			desc: 'retry',
			onClick: () => send('RETRY'),
			key: 'retry'
		}
	}

	const actionsByState = {
		awaitingLocation: [actions.RESET],
		hasLocation: [actions.REFRESH, actions.SUBSCRIBE, actions.RESET],
		subscribed: [actions.UNSUBSCRIBE, actions.RESET],
		error: [actions.RETRY, actions.RESET]
	}

	return (
		<Footer>
			{actionsByState[value] &&
				actionsByState[value].map(action => <Button {...action} />)}
		</Footer>
	)
}
