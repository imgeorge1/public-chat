import axios from "axios";

export default function Item({
  msgID,
  isServer,
  userName,
  messageContent,
  isUser,
}) {
  async function messageDelete(msgID) {
    console.log(msgID);
    try {
      await axios.delete(`http://localhost:3000/messageDelete/${msgID}`); //need to change later
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <li className={isServer ? "bg-[#A8E6A3]" : ""}>
      {userName}: {messageContent}
      <button
        className={isUser ? "bg-red-600 mx-4 mb-1 visible" : "hidden"}
        onClick={() => {
          messageDelete(msgID);
        }}
      >
        DELETE
      </button>
    </li>
  );
}
