import React from 'react'
import styled, { css } from 'styled-components'
import './App.css'
import { Bluetooth } from './Bluetooth'
import { Chart2 } from './Chart'

const bt = new Bluetooth()

function App() {
	const [temperature, setTemperature] = React.useState<string>('')
	const [humidity, setHumidity] = React.useState<string>('')
	const [buttonPressed, setButtonPressed] = React.useState<boolean>(false)

	const callbackTemperature = (value: string) => {
		setTemperature(value)
	}

	const handleConnect = async () => {
		await bt.connect() // TODO: try catch show erro
		bt.listenTemperature(callbackTemperature)
		//bt.listenHumidity(callbackHumidity)
		//bt.displayLed()
		//bt.listenButton(callbackButton)
	}

	return (
		<Page>
			<Header>
				<Button color="red" onClick={handleConnect}>
					Se conencter
				</Button>
			</Header>
			<Content>
				<Row>
					<Card color="red">{temperature}</Card>
					<Card color="blue">test</Card>
				</Row>
				<Row full>
					<Card color="red">test</Card>
				</Row>
				<Row>
					<Card color="orange">test</Card>
					<Card color="green">test</Card>
				</Row>
			</Content>
		</Page>
	)
}

const Page = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`

const Row = styled('div')<{ full?: boolean }>`
	display: flex;
	flex-direction: row;

	${(props) =>
		props.full &&
		css`
			justify-content: center;
		`}
`

const Header = styled.div`
	height: 100px;
	background-color: black;
`

const Content = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	align-items: center;
`

export const Card = styled('div')<{ color: string }>`
	color: palevioletred;
	margin: 0.5em 1em;
	padding: 0.25em 1em;

	${(props) =>
		props.color &&
		css`
			background: ${props.color};
			color: white;
		`}
`

export const Button = styled('button')<{ color: string }>`
	background: transparent;
	border-radius: 3px;
	border: 2px solid palevioletred;
	color: palevioletred;
	margin: 0.5em 1em;
	padding: 0.25em 1em;

	${(props) =>
		props.color &&
		css`
			background: ${props.color};
			color: white;
		`}
`

export default App
