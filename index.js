const port = process.env.PORT || 8000;

const io = require("socket.io")(port, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const users = {};

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("user-joined", (name) => {
        users[socket.id] = name;
        io.emit("receive", {
            name: "System",
            message: `${name} joined the chat`
        });
    });

    socket.on("send", (message) => {
        io.emit("receive", {
            message,
            name: users[socket.id]
        });
    });

    socket.on("disconnect", () => {
        delete users[socket.id];
        console.log("User disconnected:", socket.id);
    });
});
