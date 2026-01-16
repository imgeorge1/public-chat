import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";

export default function Landing() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function chooseName() {
    socket.emit("chooseName", name);
  }

  return (
    <div>
      <h1 className="flex justify-center bg-[#A8E6A3] text-[24px]">
        THE CHAT PALACE
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          chooseName();
          navigate("/Chat");
        }}
        className="flex justify-center"
      >
        <input
          type="text"
          name="name"
          placeholder="Nickname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-[50%] h-[2.5rem] ml-4 mr-2 text-2xl border"
        />
        <button className="mr-6 ml-2 p-2 border" type="submit">
          Enter
        </button>
      </form>
    </div>
  );
}
