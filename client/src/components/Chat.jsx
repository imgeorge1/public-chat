import React from "react";
import { useState } from "react";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";
import Item from "./MessageItem";
import axios from "axios";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messageArr, setMessageArr] = useState([]);
  const navigate = useNavigate();
  const element = document.getElementById("scrollToBottomOfThis");

  socket.on("invalid-username", () => {
    navigate("/");
  });

  async function getMessages() {
    // change in production https://public-chat2.onrender.com
    try {
      const response = await axios.get(
        "https://public-chat2.onrender.com/message/",
      );
      // console.log(response.data);
      setMessageArr(response.data.rows);
    } catch (error) {
      console.error(error);
    }
  }
  getMessages();

  function sendMessage(e) {
    if (message != "" && message.trim() != "") {
      socket.emit("msg", message);
    }
    if (message) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "center",
      });
    }
    // console.log(messageArr);
    getMessages();
    setMessage("");
  }

  return (
    <div className=" flex flex-col h-screen">
      <h1 className="bg-[#A8E6A3] text-center text-[24px]">THE CHAT PALACE</h1>
      <h2 className="bg-[#A8E6A3] text-[18px] px-6">
        {/* connected as: {socket.nickname} */}
      </h2>
      <div className="flex-1 overflow-y-auto p-4">
        <ul id="ul" className="text-[1.2rem] pb-10">
          {messageArr
            .filter((msg) => msg.username && msg.username.trim() !== "")
            .map((msg) => (
              <Item
                key={msg.messageid}
                isServer={msg.username === "SERVER"}
                userName={msg.username}
                isUser={msg.socketid === socket.id}
                msgID={msg.messageid}
                messageContent={msg.item}
              />
            ))}
        </ul>
        <div id="scrollToBottomOfThis"></div>
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
              autoComplete="off"
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
