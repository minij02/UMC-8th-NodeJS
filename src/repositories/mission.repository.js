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

export const getMissionsByStoreId = async (storeId) => {
    const query = `
      SELECT 
        mission_id,
        region_id,
        minimum_amount,
        reward_points,
        deadline_days
      FROM MISSION
      WHERE store_id = ?
      ORDER BY mission_id DESC
    `;
    const [rows] = await pool.query(query, [storeId]);
    return rows;
  };