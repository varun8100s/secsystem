const port = process.env.PORT || 3000
const io = require("socket.io")(port);
console.log(`Port selected is: ${port}`);

io.on("connection", (socket) => {
  console.log("A client has connected!");

  // Send a message to the client
  socket.emit("message", "Hello, client!");

  // Listen for messages from the client
  socket.on("message", (message) => {
    console.log(`Received message from client: ${message}`);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A client has disconnected!");
  });
});


