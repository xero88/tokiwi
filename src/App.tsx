import React from 'react'
import './App.css'
import { Bluetooth } from './Bluetooth'

const bt = new Bluetooth()

function App() {
	const [temperature, setTemperature] = React.useState<string>('')
	const [humidity, setHumidity] = React.useState<string>('')
	const [buttonPressed, setButtonPressed] = React.useState<boolean>(false)

	const callbackTemperature = (event: any) => {
		let value = event.target.value
		let a = []
		// Convert raw data bytes to hex values just for the sake of showing something.
		// In the "real" world, you'd use data.getUint8, data.getUint16 or even
		// TextDecoder to process raw data bytes.
		for (let i = 0; i < value.byteLength; i++) {
			a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2))
		}
		console.log('> ' + a.join(' '))

		setTemperature(`${value.getUint8(0)}.${value.getUint8(1)}`)
	}

	const callbackHumidity = (event: any) => {
		let value = event.target.value

		let a = []
		// Convert raw data bytes to hex values just for the sake of showing something.
		// In the "real" world, you'd use data.getUint8, data.getUint16 or even
		// TextDecoder to process raw data bytes.
		for (let i = 0; i < value.byteLength; i++) {
			a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2))
		}

		setHumidity(`${value.getUint8(value).toString(16).slice(-2)}`)
	}

	const callbackButton = (event: any) => {
		let value = event.target.value
		let a = []

		for (let i = 0; i < value.byteLength; i++) {
			a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2))
		}

		if (a.join(' ') === '0x01') {
			setButtonPressed(true)
		} else {
			setButtonPressed(false)
		}
	}

	const handleConnect = async () => {
		await bt.connect() // TODO: try catch show erro
		//bt.listenTemperature(callbackTemperature)
		bt.listenHumidity(callbackHumidity)
		//bt.displayLed()
		//bt.listenButton(callbackButton)
	}

	const handleLed = async () => {
		bt.displayLed()
	}

	return (
		<div className="App">
			<header className="App-header">
				{temperature}
				{humidity}
				{buttonPressed ? 'Button pressed' : 'Button not pressed'}
				<input type={'button'} value="connect" onClick={handleConnect} />
				<input type={'button'} value="led" onClick={handleLed} />
			</header>
		</div>
	)
}

export default App
