import React from "react";
import { useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("https://public-chat2.onrender.com");
export default function Chat() {
  const [message, setMessage] = useState("");
  const [messageArr, setMessageArr] = useState([]);

  async function getMessages() {
    try {
      const response = await axios.get(
        "https://public-chat2.onrender.com/message"
      );
      // console.log(response.data);
      setMessageArr(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  getMessages();

  function sendMessage(e) {
    socket.emit("msg", socket.id, message);
    getMessages();
    setMessage("");
  }

  return (
    <div className=" flex flex-col h-screen">
      <h1 className="bg-orange-300 text-center text-[24px]">THE CHAT PALACE</h1>
      <h2 className="bg-orange-300 text-[18px] px-6">
        connected as: {socket.id}
      </h2>
      <div className="flex-1 overflow-y-auto p-4">
        <ul>
          {messageArr.map((msg) => (
            <li>
              {msg.userName}: {msg.messageContent}
            </li>
          ))}
        </ul>
      </div>
      <div className="sticky bottom-0 w-full bg-white">
        <div className="w-full h-[1rem] h-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex justify-end"
          >
            <input
              type="text"
              name="message"
              placeholder="Send a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-[2.5rem] ml-4 mr-2 text-2xl border"
            />
            <button className="mr-6 ml-2 p-2 border" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
