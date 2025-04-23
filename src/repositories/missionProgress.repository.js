import { pool } from "../config/db.js";

// 이미 도전 중인지 확인
export const hasAlreadyChallenged = async (member_id, mission_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM MISSIONPROGRESS WHERE member_id = ? AND mission_id = ?",
    [member_id, mission_id]
  );
  return rows.length > 0;
};

// 도전 정보 등록
export const challengeMission = async ({ mission_id, member_id }) => {
  const query = `
    INSERT INTO MISSIONPROGRESS (mission_id, member_id, status, requested_at)
    VALUES (?, ?, 'REQUESTED', NOW())
  `;
  const [result] = await pool.query(query, [mission_id, member_id]);
  return result.insertId;
};