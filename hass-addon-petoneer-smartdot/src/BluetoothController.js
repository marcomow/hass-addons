const noble = require('@abandonware/noble');

const serviceUuid = 'fff0';
const commands = {
    stop: '0f0407000008',
    preset_small: '0f0405000107',
    preset_medium: '0f0405000208',
    preset_large: '0f0405000309'
}

module.exports.BluetoothController = class BluetoothController {
    constructor() {
        this.initialize();
    }
    async initialize() {
        noble.on('stateChange', async (state) => {
            console.log(state);
            if (state === 'poweredOn') {
                await noble.startScanningAsync([serviceUuid]);
            }
        });
        noble.on('scanStop', () => noble.startScanningAsync([serviceUuid]));
        noble.on('warning', console.log);

        noble.on('discover', async (peripheral) => {
            if (peripheral.advertisement?.localName === 'PetCat') {
                // console.log(peripheral.advertisement?.localName);
                this.peripheral = peripheral;
            }
        });
    }
    async sendPresetCommand(command, stayConnected = false) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this.peripheral) {
                    console.log('no peripheral available');
                    return;
                }
                noble.reset();
                if (!this.peripheral.mtu) {
                    await this.peripheral.connectAsync();
                }
                const services = await this.peripheral.discoverServicesAsync([serviceUuid]);
                const movementService = services[0];
                const characteristics = await movementService.discoverCharacteristicsAsync(['fff3']);
                const movementCharacteristic = characteristics[0];
                const stringCommand = commands[command];
                if (!stringCommand) {
                    await this.peripheral.disconnectAsync();
                    throw new Error(`command "${command}" not recognized.`);
                }
                const buffer = Buffer.from(stringCommand, "hex");
                const result = await movementCharacteristic.writeAsync(buffer, false);
                // console.log({ command, stringCommand, buffer, result });
                await this.peripheral.disconnectAsync();
                resolve(true);
            } catch (error) {
                console.log(error)
                await this.peripheral.disconnectAsync();
                resolve(false);
            }
        });
    }
}