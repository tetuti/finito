import React, { createContext, useContext } from 'react'
import { useMachine } from '@xstate/react'

import { wayfinder } from '../machines/wayfinder'

export const WayfinderContext = createContext(null)

export const WayfinderProvider = ({ children }) => {
	const [state, send] = useMachine(wayfinder)

	return (
		<WayfinderContext.Provider value={[state, send]}>
			{children}
		</WayfinderContext.Provider>
	)
}

export const useWayfinder = () => useContext(WayfinderContext)
