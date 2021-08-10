console.log('Petoneer addon' + new Date());
const { createBluetooth } = require('node-ble');
(async () => {
    const { bluetooth, destroy } = createBluetooth();
    const adapter = await bluetooth.defaultAdapter();
    const device = await adapter.waitDevice('34:14:B5:39:E9:A3');
    await device.connect();
    const gattServer = await device.gatt();
    const service1 = await gattServer.getPrimaryService(0xfff0);
    const characteristic1 = await service1.getCharacteristic(0xfff3);
    const command = '0f0405000309';
    const value = command.match(/.{1,2}/g).map(v => parseInt(v, 16));
    await characteristic1.writeValue(new Uint8Array(value))
    const buffer = await characteristic1.readValue()
    console.log(buffer)
})();