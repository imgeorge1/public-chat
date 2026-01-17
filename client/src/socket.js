// socket.js
import { io } from "socket.io-client";

export const socket = io("https://public-chat2.onrender.com", {
  transports: ["websocket"],
});

// change in production https://public-chat2.onrender.com || http://localhost:3000/message
