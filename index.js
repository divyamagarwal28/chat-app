const io = require("socket.io")(8000, {
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
