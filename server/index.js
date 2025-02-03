import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("emoji", (emoji) => {
    socket.broadcast.emit("newEmoji", emoji);
    console.log(`New emoji: ${emoji}`);
  });
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
