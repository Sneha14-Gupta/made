import http from "http";
import express from "express";
import axios from "axios";
import { Server } from "socket.io";

const PORT=8000;

const app = express();
const server = http.createServer(app);

const URL = `https://api.wakati.tech/ai `;

app.get("/", (req, res) => {
  res.send("Socket.io server is healthy!");
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("user", (name) => {
    socket.broadcast.emit("new_user", name);
  });

  socket.on("message", async (data) => {
    if (data.type === "text" && data.content.startsWith("@ai")) {
      socket.broadcast.emit("new_message", data); // Send the ai prompt message

      const query = {
        prompt: data.content.replaceAll("@ai", ""),
      };

      const options = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(URL, query, options);

      console.log(response);

      const newMessage = {
        ...data,
        type: "ai",
        content: response.data.result.response,
      };

      io.emit("new_message", newMessage); // Send the ai response  back
    } else {
      socket.broadcast.emit("new_message", data);
    }
  });

  socket.on("typing", (data) => {
    console.log(data);
    socket.broadcast.emit("user_typing", data);
  });
});

server.listen(PORT, () => {
  console.log(`Server is up and running on PORT:${PORT}`);
});


