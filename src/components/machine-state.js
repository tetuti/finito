import React from 'react'
import {
	PauseOutlined,
	WarningOutlined,
	LocationSearchingOutlined,
	GpsFixedOutlined
} from '@material-ui/icons'

import { useWayfinder } from '../contexts/wayfinder'

export const MachineState = () => {
	const [state] = useWayfinder()
	const { value } = state

	const states = {
		idle: (
			<>
				<PauseOutlined />
				<strong className="boring padded">{value}</strong>
			</>
		),
		hasLocation: (
			<>
				<GpsFixedOutlined />
				<strong className="positive padded">{value}</strong>
			</>
		),
		subscribed: (
			<>
				<GpsFixedOutlined />
				<strong className="continuous padded">{value}</strong>
			</>
		),
		awaitingLocation: (
			<>
				<LocationSearchingOutlined />
				<strong className="boring padded">{value}</strong>
			</>
		),
		error: (
			<>
				<WarningOutlined />
				<strong className="danger padded">{value}</strong>
			</>
		)
	}

	return <header className="header">{states[value]}</header>
}
