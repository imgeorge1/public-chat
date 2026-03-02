export default function Item({ isServer, userName, messageContent }) {
  return (
    <li className={isServer ? "bg-[#A8E6A3]" : ""}>
      {userName}: {messageContent}
    </li>
  );
}
