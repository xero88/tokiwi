import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import './App.css'
import { Bluetooth, LedColor } from './Bluetooth'
import { Chart2 } from './Chart'

const bt = new Bluetooth()

function App() {
	const [connected, setConnected] = React.useState<boolean>(false)
	const [temperature, setTemperature] = React.useState<string>('')
	const [humidity, setHumidity] = React.useState<string>('')
	const [buttonPressed, setButtonPressed] = React.useState<boolean>(false)

	const callbackTemperature = (value: string) => {
		setTemperature(value)
	}

	const callbackHumidity = (value: string) => {
		setHumidity(value)
	}

	const callbackButton = (value: any) => {
		setButtonPressed(value)
	}

	const handleConnect = async () => {
		await bt.connect()
		setConnected(true)
		bt.listenTemperature(callbackTemperature)
		bt.listenHumidity(callbackHumidity)
		bt.listenButton(callbackButton)
	}

	const handleClickGreenLed = () => bt.displayLed(LedColor.GREEN)
	const handleClickRedLed = () => bt.displayLed(LedColor.RED)
	const handleClickBlueLed = () => bt.displayLed(LedColor.BLUE)

	if (!connected) {
		return (
			<Page>
				<Header>
					<ButtonContainer>
						<Button color="white" onClick={handleConnect}>
							Se connecter
						</Button>
					</ButtonContainer>
				</Header>
				<Content>Connectez le device d'abord.</Content>
			</Page>
		)
	}

	return (
		<Page>
			<Header></Header>
			<Content>
				<Row>
					<Card color="#D92E2F">
						<h2>{temperature}</h2>
					</Card>
					<Card color="#58ABFF">
						<h2>{humidity}</h2>
					</Card>
				</Row>
				<Row full>
					<Card color="#FFC1C0">test</Card>
				</Row>
				<Row>
					<Card color="#FFD3A0">
						<h2>Led</h2>
						<DotContainer>
							<Dot color="green" onClick={handleClickGreenLed} />
							<Dot color="red" onClick={handleClickRedLed} />
							<Dot color="blue" onClick={handleClickBlueLed} />
						</DotContainer>
					</Card>
					<Card color="#6CDEB2">
						<BlackSquareButton shake={buttonPressed} />
					</Card>
				</Row>
			</Content>
		</Page>
	)
}

const breatheAnimation = keyframes`
10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`

const ButtonContainer = styled.div`
	align-self: center;
`

const Dot = styled('div')<{ color: string }>`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background: ${(props) => props.color};
`

const BlackSquareButton = styled('button')<{ shake?: boolean }>`
	background: black;
	color: white;
	border: none;
	width: 100px;
	height: 100px;

	${(props) =>
		props.shake &&
		css`
			animation-name: ${breatheAnimation};
			animation-duration: 0.82s;
			animation-iteration-count: infinite;
		`};
`

const DotContainer = styled('div')`
	display: flex;
	justify-content: space-around;
`

const Page = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`

const Row = styled('div')<{ full?: boolean }>`
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin-left: auto;
	margin-right: auto;
	width: 80%;
	${(props) =>
		props.full &&
		css`
			justify-content: center;
		`};
`

const Header = styled.div`
	display: flex;
	flex-direction: row-reverse;
	height: 80px;
	background-color: black;
	padding-right: 20px;
`

const Content = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	align-items: center;
`

export const Card = styled('div')<{ color: string }>`
	width: 100%;
	height: 200px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

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
	color: black;
	border: unset;
	padding: 1em 50px;

	${(props) =>
		props.color &&
		css`
			background: ${props.color};
		`}
`

export default App
