// socket-server.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // change this in production to your frontend domain
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Endpoint to receive messages from ML model
app.post('/send-alert', (req, res) => {
  const { alert } = req.body;

  // Send to all connected clients
  io.emit('alert', alert);

  res.status(200).json({ message: 'Alert sent to frontend' });
});

server.listen(4000, () => {
  console.log('Socket server running on http://localhost:4000');
});
