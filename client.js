const io = require("socket.io-client");
const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to server!");
});

// Listen for messages from the server
// socket.on("message", (message) => {
//   console.log(`Received message from server: ${message}`);
// });

// Send a message to the server
socket.emit("message", "Hello, server!");


var monitor = require("node-usb-detection");

monitor.add(function (device) {
  console.log("USB DEVICE INSERTED:\n", device);
});

monitor.remove(function (device) {
  console.log("USB DEVICE REMOVED:\n", device);
});
