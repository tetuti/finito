import React from 'react'

import { useWayfinder } from '../contexts/wayfinder'
import { Main } from './layout'

import {
	TrackingError,
	TrackingLoading,
	TrackingSuccess
} from './tracking-elements'

export const Tracking = () => {
	const [state] = useWayfinder()
	const { value } = state
	console.log({ state })
	return (
		<Main toggle={!state.matches('idle')}>
			{
				{
					error: <TrackingError />,
					awaitingLocation: <TrackingLoading />,
					hasLocation: <TrackingSuccess />,
					subscribed: <TrackingSuccess />
				}[value]
			}
		</Main>
	)
}
