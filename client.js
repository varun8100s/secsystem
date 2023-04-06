const os = require("os")
const io = require("socket.io-client");
const socket = io("http://localhost:3000");

socket.on("connect", () => {
    console.log("Connected to server!");
    socket.emit(
      "deviceInfo",
      `System Name: ${os.hostname()}  , Username: ${os.userInfo().username}`
    );
});

// disconnect from server
socket.on('disconnect', () => {
  console.log('Disconnected from server.');
});

//pendrive detection
var monitor = require("node-usb-detection");

monitor.add(function (device) {
    console.log("USB DEVICE INSERTED:\n", device);
    socket.emit("usb",{"status":"inserted","device":device});
});

monitor.remove(function (device) {
    console.log("USB DEVICE REMOVED:\n", device);
    socket.emit("usb", { status: "removed", device: device });
});
 