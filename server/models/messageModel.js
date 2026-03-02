import pool from "../db.js";

export async function sendMessage(userName, item) {
  await pool.query("INSERT INTO messages(userName, item) VALUES($1, $2)", [
    userName,
    item,
  ]);
}

export async function getMessages() {
  const result = await pool.query("SELECT * FROM messages ");
  return result;
}
