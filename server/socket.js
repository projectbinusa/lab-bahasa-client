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
let class_id;
let imageUrl;

app1.post("/camera-status", (req, res) => {
  const { studentId, status } = req.body;
  cameraStatus[studentId] = status;
  res.send({ success: true });
});

app1.get("/camera-status/:studentId", (req, res) => {
  const studentId = req.params.studentId;
  res.send({ status: cameraStatus[studentId] });
});

app.get("/", (req, res) => {
  res.send("server");
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
    io.to(user.room).emit("canvasImage", imageUrl);
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

  socket.on("sendMessageTopic", (message) => {
    io.emit("receiveMessageTopic", message);
  });

  socket.on("sendMessagePribadi", (message) => {
    io.emit("receiveMessagePribadi", message);
  });

  socket.on("raiseHand", (data) => {
    io.emit("raiseHand", data);
  });

  socket.on("lowerHand", (data) => {
    io.emit("lowerHand", data);
  });

  socket.on("joinWhiteboard", (room) => {
    socket.join(room);
  });

  socket.on("drawing", (data) => {
    io.to(`guru_${class_id}`).emit("drawing", data);
  });
  socket.on('shareLink', ({ link }) => {
    socket.broadcast.emit('receiveLink', { link });
  });

});

server.listen(4000, () => {
  console.log("listening on *:4000");
});
