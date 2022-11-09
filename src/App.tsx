import React from 'react'
import { AxisOptions, Chart } from 'react-charts'
import styled, { css, keyframes } from 'styled-components'
import './App.css'
import { Bluetooth, LedColor } from './Bluetooth'
import { FaTemperatureHigh, FaCloud } from 'react-icons/fa'

const bt = new Bluetooth()

type EnvValue = {
	date: Date
	value: number
}

type Series = {
	label: string
	data: EnvValue[]
}

function App() {
	const [connected, setConnected] = React.useState<boolean>(false)
	const [temperature, setTemperature] = React.useState<string>('')
	const [humidity, setHumidity] = React.useState<string>('')
	const [buttonPressed, setButtonPressed] = React.useState<boolean>(false)

	const [temperatureList, setTemperatureList] = React.useState<EnvValue[]>([{ date: new Date(), value: 25 }]) // bizarre bug lib
	const [humidityList, setHumidityList] = React.useState<EnvValue[]>([{ date: new Date(), value: 25 }]) // bizarre bug lib

	const data: Series[] = [
		{
			label: 'Températures',
			data: temperatureList,
		},
		{
			label: 'Humidité',
			data: humidityList,
		},
	]

	const callbackTemperature = (value: string) => {
		console.log(data)
		setTemperature(value)
		setTemperatureList((temperatureList) => [...temperatureList, { date: new Date(), value: parseInt(value) }])
	}

	const callbackHumidity = (value: string) => {
		setHumidity(value)
		setHumidityList((humidityList) => [...humidityList, { date: new Date(), value: parseInt(value) }])
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

	const primaryAxis = React.useMemo(
		(): AxisOptions<EnvValue> => ({
			getValue: (datum) => datum.date,
		}),
		[]
	)

	const secondaryAxes = React.useMemo(
		(): AxisOptions<EnvValue>[] => [
			{
				getValue: (datum) => datum.value,
			},
		],
		[]
	)

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
				<Content>
					<h1>Veuillez vous connecter</h1>
				</Content>
			</Page>
		)
	}

	return (
		<Page>
			<Header></Header>
			<Content>
				<Row>
					<Card color="#D92E2F">
						<Title>
							<FaTemperatureHigh />
							<br />
							{temperature}
						</Title>
					</Card>
					<Card color="#58ABFF">
						<Title color="black">
							<FaCloud />
							<br />
							{humidity} %
						</Title>
					</Card>
				</Row>
				<Row full>
					<Card color="#FFC1C0">
						<Chart
							options={{
								data,
								primaryAxis,
								secondaryAxes,
							}}
						/>
					</Card>
				</Row>
				<Row>
					<Card color="#FFD3A0">
						<Title color="black">Led</Title>
						<DotContainer>
							<Dot color="green" onClick={handleClickGreenLed} />
							<Dot color="red" onClick={handleClickRedLed} />
							<Dot color="blue" onClick={handleClickBlueLed} />
						</DotContainer>
					</Card>
					<Card color="#6CDEB2">
						<Title color="black">Bouton</Title>
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

	@media (max-width: 580px) {
		width: 20px;
		height: 20px;
	}
`

const Title = styled('span')<{ color?: string }>`
	font-size: 2rem;
	text-align: center;

	color: ${(props) => props.color};

	@media (max-width: 580px) {
		font-size: 1rem;
	}
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

	@media (max-width: 580px) {
		width: 50px;
		height: 50px;
	}
`

const DotContainer = styled('div')`
	display: flex;
	justify-content: space-around;
	gap: 20px;

	@media (max-width: 580px) {
		gap: 5px;
	}
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
	gap: 16px;

	color: palevioletred;
	margin: 0.5em 1em;
	padding: 0.25em 1em;

	@media (max-width: 580px) {
		height: 100px;
	}

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
