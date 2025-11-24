const PORT = process.env.PORT || 8000;

const io = require("socket.io")(PORT, {
    cors: {
        origin: "*",
    }
});

const users = {};

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("user-joined", (name) => {
        users[socket.id] = name;

        socket.broadcast.emit("receive", {
            name: "System",
            message: `${name} joined the chat`
        });
    });

    socket.on("send", (message) => {
        socket.broadcast.emit("receive", {
            message,
            name: users[socket.id]
        });
    });

    socket.on("disconnect", () => {
        delete users[socket.id];
    });
});

console.log("Server running on port:", PORT);

