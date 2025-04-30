import express from 'express';
import dotenv from "dotenv";
import { register, getUserInfo } from "./controllers/user.controller.js";
import { createStore, handleListStoreMissions } from "./controllers/store.controller.js";
import { postReview } from "./controllers/review.controller.js";
import { createMission } from "./controllers/mission.controller.js";
import { handleListMyReviews } from "./controllers/userReview.controller.js";
import { postChallenge, getInProgressMissionsByMember, markMissionAsCompleted } from "./controllers/missionProgress.controller.js";

dotenv.config();
const app = express();
const port = 3000;

// 공통 응답 헬퍼 등록
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.use(express.json());

// 라우팅
app.post("/users", register);
app.get("/users/:id", getUserInfo);
app.get("/members/:memberId/missions/in-progress", getInProgressMissionsByMember);
app.post("/stores", createStore);
app.get("/members/:memberId/reviews", handleListMyReviews);
app.get("/stores/:storeId/missions", handleListStoreMissions);
app.post("/reviews", postReview);
app.post("/missions", createMission);
app.post("/missions/challenge", postChallenge);
app.patch("/missions/progress/:progressId/complete", markMissionAsCompleted);

// 전역 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});