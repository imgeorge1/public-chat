import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { env } from "process";

const port = 3000;
const app = express();
const httpServer = createServer(app);
const messages = [];

const io = new Server(httpServer, {
  cors: { origin: "*" }, //need to change origin
});

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/message", (req, res) => {
  res.json(messages);
});
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  // console.log(messages);

  socket.on("chooseName", (nickName) => {
    socket.nickname = nickName;
  });

  socket.on("msg", (messageData) => {
    // console.log(user, messageData);
    messages.push({ userName: socket.nickname, messageContent: messageData });
    // console.log(messages);
  });
});

httpServer.listen(port, () => {
  console.log("Server running on port " + port);
});
