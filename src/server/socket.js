const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Socket.IO implementation for whiteboards
const whiteboards = {};

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joinWhiteboard', ({ classId, studentId }) => {
    const boardId = `${classId}-${studentId}`;

    if (!whiteboards[boardId]) {
      whiteboards[boardId] = {
        paths: [],
      };
    }

    socket.join(boardId);
    socket.emit('initBoard', whiteboards[boardId].paths);
  });

  socket.on('drawing', (data) => {
    const { classId, studentId, paths } = data;
    const boardId = `${classId}-${studentId}`;
    whiteboards[boardId].paths = paths;
    socket.to(boardId).emit('drawing', paths);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});