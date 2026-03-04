import pool from "../db.js";

export async function sendMessage(userName, item, socketID) {
  await pool.query(
    "INSERT INTO messages(userName, item, socketid) VALUES($1, $2, $3)",
    [userName, item, socketID],
  );
}

export async function getMessages() {
  const result = await pool.query("SELECT * FROM messages ");
  return result;
}

export async function deleteMessage(msgid) {
  await pool.query("DELETE FROM messages WHERE messageid = $1", [msgid]);
}
