import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("new_user", (data) => {
    console.log("New user joined our chat room", data);

    socket.broadcast.emit("user_joined", data);

    // io.emit (sab ke pass)
    // socket.emit (jisne new user diya tha uske pass only)
    // socket.broadcast.emit (jisne new user diya tha usko chodh kar baki sab)
  });
});

server.listen(8000, () => {
  console.log("Server is up and running");
});