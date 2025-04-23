import { pool } from "../config/db.js";

const testConnection = async () => {
    try {
      const conn = await pool.getConnection(); // 커넥션 풀에서 연결 하나 얻기
      const [rows] = await conn.query('SELECT NOW()'); // 쿼리 실행
      console.log('DB 연결 성공:', rows);
      conn.release(); // 커넥션 반환
    } catch (err) {
      console.error('DB 연결 실패:', err.message);
    }
  };
  
  testConnection();