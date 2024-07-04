const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinWhiteboard", ({ room, role }) => {
    socket.join(room);
    console.log(`Joined room: ${room}`);
  });

  socket.on("drawing", ({ whiteboardId, paths }) => {
    io.to(whiteboardId).emit("drawing", { whiteboardId, paths });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
