import { pool } from "../config/db.js";

export const getReviewsByMemberId = async (memberId, cursor) => {
  const query = `
    SELECT r.review_id, r.rating, r.content, r.created_at, s.store_name
    FROM REVIEW r
    JOIN MISSION m ON r.mission_id = m.mission_id
    JOIN STORE s ON m.store_id = s.store_id
    WHERE r.member_id = ?
    ${cursor ? "AND r.review_id > ?" : ""}
    ORDER BY r.review_id ASC
    LIMIT 5
  `;
  const [rows] = await pool.query(query, cursor ? [memberId, cursor] : [memberId]);
  return rows;
};