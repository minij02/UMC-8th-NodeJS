import { pool } from "../config/db.js";

export const createUser = async ({ username, email, gender, birth_date }) => {
  const query = `
    INSERT INTO MEMBER (username, email, gender, birth_date, created_at, updated_at)
    VALUES (?, ?, ?, ?, NOW(), NOW())
  `;
  const [result] = await pool.query(query, [username, email, gender, birth_date]);
  return result.insertId;
};

export const findUserById = async (member_id) => {
  const [rows] = await pool.query("SELECT * FROM MEMBER WHERE member_id = ?", [member_id]);
  return rows[0] || null;
};