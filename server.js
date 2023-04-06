const port = process.env.PORT || 3000
const io = require("socket.io")(port);
console.log(`Control Panel\nPort selected is: ${port}`);

const allSystems = []

// console.log(`1) View all systems online \n2) Exit`)

io.on("connection", (socket) => {
  
  // Listen for system info from the client
  socket.on("deviceInfo", (message) => {
      console.log(`${message} CONNECTED`);
      allSystems.push({ id: socket.id, deviceInfo: message })
      console.log("Systems online: "+allSystems.length)
  });
    
    
  // Handle disconnection
  socket.on("disconnect", (msg) => {
      
      for (i in allSystems) {
          if (socket.id == allSystems[i].id) {
              console.log(allSystems[i].deviceInfo+" DISCONNECTED")  
              allSystems.splice(i, 1)
          }
      }
      console.log("Systems online: " + allSystems.length);
  });
    
    //listen to usb changes reported
    socket.on("usb", (logmsg) => {
        for (i in allSystems) {
          if (socket.id == allSystems[i].id) {
            console.log("======USB CHANGES DETECTED======\n",allSystems[i].deviceInfo );
          }
        }
        console.log(logmsg)
    })
});


