import { pool } from "../config/db.js";

// 가게 존재 여부 확인
export const isStoreExist = async (storeId) => {
  const [rows] = await pool.query("SELECT * FROM STORE WHERE store_id = ?", [storeId]);
  return rows.length > 0;
};

// 리뷰 추가
export const addReview = async ({ mission_id, member_id, rating, content }) => {
  const query = `
    INSERT INTO REVIEW (mission_id, member_id, rating, content, created_at)
    VALUES (?, ?, ?, ?, NOW())
  `;
  const [result] = await pool.query(query, [mission_id, member_id, rating, content]);
  return result.insertId;
};