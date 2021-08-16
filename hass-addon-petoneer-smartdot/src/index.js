const { BluetoothController } = require("./BluetoothController");

console.log('Petoneer addon started!');
const bluetoothController = new BluetoothController();

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on("data", (commandRaw) => {
    const command = (commandRaw + "").replace(/"/g, "").trim();
    bluetoothController.sendPresetCommand(command);
});