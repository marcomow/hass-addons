const { BluetoothController } = require("./BluetoothController");

console.log('Petoneer addon started!');
const bluetoothController = new BluetoothController();

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on("data", async (commandRaw) => {
    const command = (commandRaw + "").replace(/"/g, "").trim();
    const stoppedSuccessfully = await bluetoothController.sendPresetCommand('stop', true);
    if (command !== 'stop' && stoppedSuccessfully) {
        await bluetoothController.sendPresetCommand(command);
    }
});