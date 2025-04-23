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

// 리뷰 목록 조회회
export const getReviewsByStoreId = async (storeId) => {
    const query = `
      SELECT 
        r.review_id,
        r.rating,
        r.content,
        r.created_at,
        m.username AS nickname,
        (SELECT GROUP_CONCAT(image_url) FROM REVIEWIMAGE WHERE review_id = r.review_id) AS image_urls
      FROM REVIEW r
      JOIN MEMBER m ON r.member_id = m.member_id
      JOIN MISSION mi ON r.mission_id = mi.mission_id
      WHERE mi.store_id = ?
      ORDER BY r.created_at DESC
    `;
    const [rows] = await pool.query(query, [storeId]);
    return rows;
  };