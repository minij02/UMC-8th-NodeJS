import { pool } from "../config/db.js";

export const createStore = async ({ store_name, category, address, region_id }) => {
  const query = `
    INSERT INTO STORE (store_name, category, address, region_id, rating, is_open)
    VALUES (?, ?, ?, ?, 0, true)
  `;
  const [result] = await pool.query(query, [store_name, category, address, region_id]);
  return result.insertId;
};