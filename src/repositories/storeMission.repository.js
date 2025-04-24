import { pool } from "../config/db.js";

export const getMissionsByStoreId = async (storeId, cursor) => {
  const query = `
    SELECT mission_id, region_id, minimum_amount, reward_points, deadline_days
    FROM MISSION
    WHERE store_id = ?
    ${cursor ? "AND mission_id > ?" : ""}
    ORDER BY mission_id ASC
    LIMIT 5
  `;
  const [rows] = await pool.query(query, cursor ? [storeId, cursor] : [storeId]);
  return rows;
};