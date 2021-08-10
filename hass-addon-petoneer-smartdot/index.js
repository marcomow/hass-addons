console.log('Petoneer addon ' + new Date());

const { createBluetooth } = require('node-ble');

(async () => {
    const { bluetooth, destroy } = createBluetooth();
    const adapter = await bluetooth.defaultAdapter();
    console.log(adapter)
})();