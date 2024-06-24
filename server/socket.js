const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

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

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(4000, () => console.log("Server is running on port 4000"));
