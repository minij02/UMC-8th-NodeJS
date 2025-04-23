import { pool } from "../config/db.js";

export const createMission = async ({ store_id, region_id, minimum_amount, reward_points, deadline_days }) => {
  const query = `
    INSERT INTO MISSION (store_id, region_id, minimum_amount, reward_points, deadline_days)
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await pool.query(query, [
    store_id,
    region_id,
    minimum_amount,
    reward_points,
    deadline_days,
  ]);
  return result.insertId;
};