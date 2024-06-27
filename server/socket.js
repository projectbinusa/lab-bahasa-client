// server.js

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const { userJoin, getUsers, userLeave } = require("../server/utils/user");

const bodyParser = require("body-parser");
const app = express();
const app1 = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app1.use(bodyParser.json());

let cameraStatus = {};
let userRoom;

app1.post("/camera-status", (req, res) => {
  const { studentId, status } = req.body;
  cameraStatus[studentId] = status;
  res.send({ success: true });
});

app1.get("/camera-status/:studentId", (req, res) => {
  const studentId = req.params.studentId;
  res.send({ status: cameraStatus[studentId] });
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("user-joined", (data) => {
    const { roomId, userId, userName, host, presenter } = data;
    userRoom = roomId;
    const user = userJoin(socket.id, userName, roomId, host, presenter);
    const roomUsers = getUsers(user.room);
    socket.join(user.room);
    socket.emit("message", {
      message: "Welcome to ChatRoom",
    });
    socket.broadcast.to(user.room).emit("message", {
      message: `${user.username} has joined`,
    });

    io.to(user.room).emit("users", roomUsers);
    socket.emit("canvasImage", imageUrl);
  });

  socket.on("drawing", (data) => {
    imageUrl = data;
    socket.broadcast.to(userRoom).emit("canvasImage", imageUrl);
  });

  socket.on("disconnect", () => {
    const userLeaves = userLeave(socket.id);
    const roomUsers = getUsers(userRoom);

    if (userLeaves) {
      io.to(userLeaves.room).emit("message", {
        message: `${userLeaves.username} left the chat`,
      });
      io.to(userLeaves.room).emit("users", roomUsers);
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

  // Event untuk mengirim data gambar dari klien ke server
  // socket.on('drawing', (data) => {
  //   // Kirim data gambar ke semua klien yang terhubung, termasuk pengirim
  //   io.emit('drawing', data);
  // });

  // // Event untuk bergabung ke papan gambar
  // socket.on('joinWhiteboard', (room) => {
  //   socket.join(room);
  // });

  socket.on("joinWhiteboard", (room) => {
    socket.join(room); // Bergabung ke room papan gambar yang sesuai
  });

  // Contoh mengirim data gambar ke room tertentu (misal: papan gambar guru)
  socket.on("drawing", (data) => {
    io.to(`guru_${class_id}`).emit("drawing", data);
  });
  socket.on('shareLink', ({ link }) => {
    // Kirim tautan kepada semua siswa yang terhubung
    socket.broadcast.emit('receiveLink', { link });
  });


  // socket.on("joinWhiteboard", (whiteboardId) => {
  //   socket.join(whiteboardId);
  //   console.log(`Client joined whiteboard: ${whiteboardId}`);
  // });

  // // Listen for drawing events from the client
  // socket.on("drawing", (data) => {
  //   const { whiteboardId, paths } = data;
  //   // Broadcast drawing data to everyone in the same whiteboard room
  //   socket.to(whiteboardId).emit("drawing", { paths });
  // });

  // // Listen for student drawing events
  // socket.on("studentDrawing", (data) => {
  //   const { studentId, paths } = data;
  //   // Broadcast student drawing data to everyone in the specific student's room
  //   socket.to(studentId).emit("studentDrawing", { studentId, paths });
  // });
});

server.listen(4000, () => {
  console.log("listening on *:4000");
});
