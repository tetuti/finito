import React from 'react'

import { WayfinderProvider } from './contexts/wayfinder'
import { Tracking, Actions, Targets, MachineState } from './components'
import './App.css'

function App() {
	return (
		<WayfinderProvider>
			<div className="app">
				<MachineState />
				<Tracking />
				<Actions />
				<Targets />
			</div>
		</WayfinderProvider>
	)
}

export default App
