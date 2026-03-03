export default function Item({ isServer, userName, messageContent, isUser }) {
  return (
    <li className={isServer ? "bg-[#A8E6A3]" : ""}>
      {userName}: {messageContent}
      <button className={isUser ? "bg-red-600 mx-4 mb-1 visible" : "hidden"}>
        DELETE
      </button>
    </li>
  );
}
