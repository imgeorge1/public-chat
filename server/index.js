import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import {
  sendMessage,
  getMessages,
  deleteMessage,
} from "./models/messageModel.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const front_url = process.env.FRONTEND_URL;
const port = 3000;
const app = express();
const httpServer = createServer(app);
const messages = [];

const io = new Server(httpServer, {
  cors: { origin: `${front_url}` }, //need to change origin https://public-chat-fffg.onrender.com
});

app.use(
  cors({
    origin: `${front_url}`,
  }),
);
app.use(express.json());

app.get("/message", async (req, res) => {
  const messages = await getMessages();
  res.json(messages);
});

app.delete("/messageDelete/:msgID", async (req, res) => {
  const { msgID } = req.params;
  try {
    deleteMessage(msgID);
  } catch (error) {
    console.error(error);
  }
});

app.get("/chat", (req, res) => {
  res.sendStatus(200);
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  // console.log(messages);

  socket.on("chooseName", (nickName) => {
    if (!nickName || nickName.trim() === "" || nickName === "SERVER") {
      socket.emit("invalid-username");
      return;
    }
    socket.nickname = nickName;
    sendMessage("SERVER", `${nickName} has joined the chat`);
  });

  if (!socket.nickname || socket.nickname.trim() === "") {
    socket.emit("invalid-username");
    sendMessage("SERVER", `An user has left the chat`);
  }

  socket.on("msg", (messageData) => {
    // console.log(user, messageData);
    // messages.push({ userName: socket.nickname, messageContent: messageData });
    sendMessage(socket.nickname, messageData, socket.id);
    // console.log(socket.id);
  });
});

httpServer.listen(port, () => {
  console.log("Server running on port " + port);
});
