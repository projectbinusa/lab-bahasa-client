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
});

server.listen(4000, () => {
  console.log("listening on *:4000");
});
