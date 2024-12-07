const db = require("../config/db");

const checkUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = ?";
  const [rows] = await db.execute(query, [email]);
  return rows.length > 0 ? rows[0] : null;
};

const addUser = async (username, email, password) => {
  const query =
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  const values = [username, email, password];
  const [result] = await db.execute(query, values);
  return result.insertId;
};

const verifyLogin = async (email, password) => {
  const query = "SELECT * FROM users WHERE email = ?";
  const [rows] = await db.execute(query, [email]);
  return rows.length > 0 ? rows[0] : null;
};

module.exports = { checkUserByEmail, addUser, verifyLogin };
