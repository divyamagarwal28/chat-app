const port = process.env.PORT || 8000;
const io = require("socket.io")(port, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const users = {}; 

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);


  socket.on("user-joined", (name) => {
    users[socket.id] = name;

    
    socket.emit("receive", {
      name: "System",
      message: `Welcome ${name}!`,
    });

   
    socket.broadcast.emit("receive", {
      name: "System",
      message: `${name} joined the chat`,
    });
  });


  socket.on("send", (message) => {
    const name = users[socket.id];
    if (!name) return; // Safety check

    io.emit("receive", {
      name,
      message,
    });
  });

  socket.on("disconnect", () => {
    const name = users[socket.id];
    if (name) {

        socket.broadcast.emit("receive", {
        name: "System",
        message: `${name} left the chat`,
      });

      delete users[socket.id];
    }
    console.log("User disconnected:", socket.id);
  });
});

console.log(`Socket.IO server running on port ${port}`);
