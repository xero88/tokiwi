const ENV_SERVICE = 'ef680200-9b35-4933-9b10-52ffa9740042'
const INPUT_SERVICE = 'ef680300-9b35-4933-9b10-52ffa9740042'

const SERVICE_LIST = [ENV_SERVICE, INPUT_SERVICE]

const TEMPERATURE_CHAR = 'ef680201-9b35-4933-9b10-52ffa9740042'
const HUMIDITY = 'ef680203-9b35-4933-9b10-52ffa9740042'
const LED = 'ef680301-9b35-4933-9b10-52ffa9740042'
const BUTTON = 'ef680302-9b35-4933-9b10-52ffa9740042'

// service led
// ef680300-9b35-4933-9b10-52ffa9740042

// char led => ef680301-9b35-4933-9b10-52ffa9740042

// 201
// 0203

// 0301 => led

export class Bluetooth {
	async connect() {
		let serviceUuid = 'ef680200-9b35-4933-9b10-52ffa9740042'
		if (serviceUuid.startsWith('0x')) {
			serviceUuid = parseInt(serviceUuid)
		}

		let characteristicUuid = 'ef680201-9b35-4933-9b10-52ffa9740042'
		if (characteristicUuid.startsWith('0x')) {
			characteristicUuid = parseInt(characteristicUuid)
		}

		try {
			console.log('Requesting Bluetooth Device...')
			const device = await navigator.bluetooth.requestDevice({
				filters: [{ services: SERVICE_LIST }],
			})

			console.log('Connecting to GATT Server...')
			this.server = await device.gatt.connect()
			console.log('connected.')
		} catch (error) {
			console.console.log('Argh! ' + error)
		}
	}

	async listenTemperature(callback) {
		try {
			// TODO: CEHCK SERVER

			console.log('Getting Service...')
			const service = await this.server.getPrimaryService(parseUID(ENV_SERVICE))

			console.log('Getting Characteristic...')
			const myCharacteristic = await service.getCharacteristic(parseUID(TEMPERATURE_CHAR))

			await myCharacteristic.startNotifications()

			console.log('> Notifications started')
			myCharacteristic.addEventListener('characteristicvaluechanged', callback)
		} catch (error) {
			console.console.log('Argh! ' + error)
		}
	}

	async listenHumidity(callback) {
		try {
			// TODO: CEHCK SERVER

			console.log('Getting Service...')
			const service = await this.server.getPrimaryService(parseUID(ENV_SERVICE))

			console.log('Getting Characteristic...')
			const myCharacteristic = await service.getCharacteristic(parseUID(HUMIDITY))

			await myCharacteristic.startNotifications()

			console.log('> Notifications started')
			myCharacteristic.addEventListener('characteristicvaluechanged', callback)
		} catch (error) {
			console.console.log('Argh! ' + error)
		}
	}

	async displayLed() {
		console.log('Getting Heart Rate Service...')
		const service = await this.server.getPrimaryService(parseUID('ef680300-9b35-4933-9b10-52ffa9740042'))

		console.log('Getting Heart Rate Control Point Characteristic...')
		const characteristic = await service.getCharacteristic(parseUID(LED))

		console.log('Writing Heart Rate Control Point Characteristic...')
		// Writing 1 is the signal to reset energy expended.
		//let resetEnergyExpended = Uint8Array.of(1)

		var red = new Uint8Array([1, 255, 0, 0])
		var green = new Uint8Array([1, 124, 252, 0])
		var blue = new Uint8Array([1, 30, 144, 255])

		// 124,252,0
		// rgb(30,144,255)

		await characteristic.writeValue(green)
	}

	async listenButton(callback) {
		try {
			// TODO: CEHCK SERVER

			console.log('Getting Service...')
			const service = await this.server.getPrimaryService(parseUID(INPUT_SERVICE))

			console.log('Getting Characteristic...')
			const myCharacteristic = await service.getCharacteristic(parseUID(BUTTON))

			await myCharacteristic.startNotifications()

			console.log('> Notifications started')
			myCharacteristic.addEventListener('characteristicvaluechanged', callback)
		} catch (error) {
			console.console.log('Argh! ' + error)
		}
	}
}

const parseUID = (uid) => {
	let characteristicUuid = uid
	if (characteristicUuid.startsWith('0x')) {
		characteristicUuid = parseInt(characteristicUuid)
	}

	return characteristicUuid
}
