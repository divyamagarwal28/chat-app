const port = process.env.PORT || 8000;
const io = require("socket.io")(port, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const users = {}; // store connected users

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // User joins chat
  socket.on("user-joined", (name) => {
    users[socket.id] = name;

    // Notify everyone except the new user
    socket.broadcast.emit("receive", {
      name: "System",
      message: `${name} joined the chat`
    });

    // Optional: Send welcome message to the new user
    socket.emit("receive", {
      name: "System",
      message: `Welcome ${name}!`
    });
  });

  // User sends a message
  socket.on("send", (message) => {
    // Send to everyone except sender
    socket.broadcast.emit("receive", {
      message,
      name: users[socket.id]
    });
  });

  // User disconnects
  socket.on("disconnect", () => {
    const name = users[socket.id];
    if (name) {
      // Notify everyone that user left
      socket.broadcast.emit("receive", {
        name: "System",
        message: `${name} left the chat`
      });
      delete users[socket.id];
    }
    console.log("User disconnected:", socket.id);
  });
});
