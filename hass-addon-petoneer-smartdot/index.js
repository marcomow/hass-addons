console.log('Petoneer addon ' + new Date());

const noble = require('@abandonware/noble');

(async () => {
    noble.on('stateChange', async (state) => {
        if (state === 'poweredOn') {
            await noble.startScanningAsync([0xfff0], false);
        }
    });
    noble.on('discover', async (peripheral) => {
        await noble.stopScanningAsync();
        await peripheral.connectAsync();
        const { characteristics } = await peripheral.discoverSomeServicesAndCharacteristicsAsync([0xfff0]);
        const batteryLevel = (await characteristics[0].readAsync())[0];

        console.log(`${peripheral.address} (${peripheral.advertisement.localName}): ${batteryLevel}%`);

        await peripheral.disconnectAsync();
        process.exit(0);
    });

})();