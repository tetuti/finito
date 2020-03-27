import { Machine, assign } from 'xstate'
import { sleep } from '../utils'

let targets = {
	lars: { x: 0, y: 0, z: 0 },
	anna: { x: 1, y: 1, z: 1 },
	birk: { x: -1, y: -1, z: -1 },
	tuva: { x: 1, y: -1, z: 0 }
}
const randomOffset = () => Math.round(Math.random() * 2 - 1) / 10
const touch = target => {
	targets = {
		...targets,
		[target]: {
			x: targets[target].x + randomOffset(),
			y: targets[target].y + randomOffset(),
			z: targets[target].z + randomOffset()
		}
	}
}

const fetchLocation = async ({ target }) => {
	touch(target)

	await sleep(Math.random() * 1000)
	if (Math.random() > 0.9) throw new Error('fudge')
	return targets[target]
}

export const wayfinder = Machine({
	id: 'wayfinder',
	initial: 'idle',
	context: {
		target: null,
		location: null,
		lastFetch: null
	},
	states: {
		idle: {
			on: {
				SELECT: {
					target: 'awaitingLocation',
					actions: assign((context, event) => {
						const { target } = event
						return {
							...context,
							target: target
						}
					})
				}
			}
		},
		awaitingLocation: {
			invoke: {
				id: 'getPath',
				src: (context, _) => fetchLocation(context),
				onDone: {
					target: 'hasLocation',
					actions: assign({
						location: (_, event) => event.data,
						lastFetch: () => Date.now()
					})
				},
				onError: 'error'
			}
		},
		hasLocation: {
			on: {
				REFRESH: 'awaitingLocation',
				SUBSCRIBE: 'subscribed'
			}
		},
		subscribed: {
			invoke: {
				id: 'subscribeLocation',
				target: 'subscribed',
				src: (context, _) => fetchLocation(context),
				onDone: {
					target: 'subscribed',
					actions: assign({
						location: (_, event) => event.data,
						lastFetch: () => Date.now()
					})
				},
				onError: 'error'
			},
			on: {
				UNSUBSCRIBE: 'hasLocation'
			}
		},
		error: {
			on: {
				RETRY: 'awaitingLocation'
			}
		}
	},
	on: {
		RESET: {
			target: 'idle',
			actions: assign({
				target: null,
				location: null
			})
		}
	}
})
