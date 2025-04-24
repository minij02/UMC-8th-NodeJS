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
    VALUES (?, ?, 'IN_PROGRESS', NOW())
  `;
  const [result] = await pool.query(query, [mission_id, member_id]);
  return result.insertId;
};

// 도전 중인 미션 조회
export const getInProgressMissionsByMemberId = async (memberId, cursor = 0) => {
  const query = `
    SELECT 
      mp.progress_id,
      mp.mission_id,
      s.store_name,
      m.minimum_amount,
      m.reward_points,
      m.deadline_days,
      mp.status,
      mp.requested_at
    FROM MISSIONPROGRESS mp
    JOIN MISSION m ON mp.mission_id = m.mission_id
    JOIN STORE s ON m.store_id = s.store_id
    WHERE mp.member_id = ?
      AND mp.status = 'IN_PROGRESS'
      ${cursor ? "AND mp.progress_id > ?" : ""}
    ORDER BY mp.progress_id ASC
    LIMIT 5
  `;
  const [rows] = await pool.query(query, cursor ? [memberId, cursor] : [memberId]);
  return rows;
};

// 미션 완료 처리리
export const completeMissionProgress = async (progressId) => {
  const query = `
    UPDATE MISSIONPROGRESS
    SET status = 'COMPLETED',
        completed_at = NOW()
    WHERE progress_id = ?
  `;
  const [result] = await pool.query(query, [progressId]);
  return result.affectedRows > 0;
};