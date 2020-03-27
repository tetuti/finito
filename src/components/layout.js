import React, { useRef } from 'react'
import { animated, useSpring } from 'react-spring'
import { useFrame } from 'react-three-fiber'

export const Button = ({ desc, onClick, style }) => {
	return (
		<button
			className={['button', style].filter(value => !!value).join(' ')}
			onClick={onClick}
		>
			{desc}
		</button>
	)
}

export const Overlay = ({ children, toggle }) => {
	const style = useSpring({
		top: toggle ? '15vh' : '100vh'
	})
	return (
		<animated.aside style={style} className="overlay">
			{children}
		</animated.aside>
	)
}

export const Box = props => {
	const mesh = useRef()
	useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))
	return (
		<mesh {...props} ref={mesh} scale={[1, 1, 1]}>
			<boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
			<meshStandardMaterial attach="material" color="orangered" />
		</mesh>
	)
}

export const Header = ({ children }) => (
	<header className="header">{children}</header>
)

export const Main = ({ children, toggle }) => {
	const style = useSpring({ opacity: toggle ? 1 : 0 })
	return (
		<animated.main style={style} className="main">
			{children}
		</animated.main>
	)
}

export const Footer = ({ children }) => (
	<footer className="footer">{children}</footer>
)
