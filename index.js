const port = process.env.PORT || 8000;
const io = require("socket.io")(port, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const users = {}; // To store socket.id -> username mapping

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Event: User joins
  socket.on("user-joined", (name) => {
    users[socket.id] = name;

    // Send welcome message to the joining user
    socket.emit("receive", {
      name: "System",
      message: `Welcome ${name}!`,
    });

    // Notify everyone else
    socket.broadcast.emit("receive", {
      name: "System",
      message: `${name} joined the chat`,
    });
  });

  // Event: User sends a message
  socket.on("send", (message) => {
    const name = users[socket.id];
    if (!name) return; // Safety check

    // Send message to all users including sender
    io.emit("receive", {
      name,
      message,
    });
  });

  // Event: User disconnects
  socket.on("disconnect", () => {
    const name = users[socket.id];
    if (name) {
      // Notify everyone else
      socket.broadcast.emit("receive", {
        name: "System",
        message: `${name} left the chat`,
      });

      // Remove from users list
      delete users[socket.id];
    }
    console.log("User disconnected:", socket.id);
  });
});

console.log(`Socket.IO server running on port ${port}`);
