const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const { userJoin, getUsers, userLeave } = require("../server/utils/user");

const bodyParser = require("body-parser");
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Sesuaikan dengan URL aplikasi Anda
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(bodyParser.json());

// State untuk menyimpan gambar per room
let roomImages = {};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("user-joined", (data) => {
    const { roomId, userId, userName, host, presenter } = data;
    const user = userJoin(socket.id, userName, roomId, host, presenter);
    const roomUsers = getUsers(roomId);

    socket.join(roomId);
    socket.emit("message", { message: "Welcome to ChatRoom" });
    socket.broadcast.to(roomId).emit("message", {
      message: `${user.username} has joined`,
    });

    io.to(roomId).emit("users", roomUsers);

    // Kirim gambar terakhir yang ada di room kepada user yang baru bergabung
    if (roomImages[roomId]) {
      socket.emit("canvasImage", roomImages[roomId]);
    }
  });

  socket.on("drawing", (data) => {
    const { roomId, imageUrl } = data;
    roomImages[roomId] = imageUrl; // Simpan gambar di state roomImages

    socket.broadcast.to(roomId).emit("canvasImage", imageUrl);
  });

  socket.on("disconnect", () => {
    const userLeaves = userLeave(socket.id);

    if (userLeaves) {
      const { room: roomId, username } = userLeaves;
      const roomUsers = getUsers(roomId);

      io.to(roomId).emit("message", {
        message: `${username} left the chat`,
      });
      io.to(roomId).emit("users", roomUsers);
    }
  });

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message);
  });

  socket.on("raiseHand", (data) => {
    io.emit("raiseHand", data);
  });

  socket.on("lowerHand", (data) => {
    io.emit("lowerHand", data);
  });

  socket.on("joinWhiteboard", (room) => {
    socket.join(room); // Bergabung ke room papan gambar yang sesuai
  });

  socket.on("shareLink", ({ link }) => {
    // Kirim tautan kepada semua siswa yang terhubung
    socket.broadcast.emit("receiveLink", { link });
  });

});

server.listen(4000, () => {
  console.log("listening on *:4000");
});
