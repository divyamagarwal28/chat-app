const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

const io = new Server(server, {
    cors: {
        origin: "*"
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

app.get("/", (req, res) => {
    res.send("Socket.io chat server running ✔");
});

server.listen(PORT, () => {
    console.log("Server running on port:", PORT);
});
