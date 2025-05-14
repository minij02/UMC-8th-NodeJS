import express from 'express';
import dotenv from "dotenv";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import cors from "cors"
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy } from "./auth.config.js";
import { githubStrategy } from "./auth.config.js";
import { prisma } from "./config/db.js";
import { register, getUserInfo } from "./controllers/user.controller.js";
import { createStore, handleListStoreMissions } from "./controllers/store.controller.js";
import { postReview } from "./controllers/review.controller.js";
import { createMission } from "./controllers/mission.controller.js";
import { handleListMyReviews } from "./controllers/userReview.controller.js";
import { postChallenge, getInProgressMissionsByMember, markMissionAsCompleted } from "./controllers/missionProgress.controller.js";

dotenv.config();

passport.use(googleStrategy);
passport.use(githubStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
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

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 8th",
      description: "UMC 8th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

// 라우팅
app.get("/", (req, res) => {
  // #swagger.ignore = true
  console.log(req.user);
  res.send("Hello World!");
});
// 구글 로그인 시작
app.get("/oauth2/login/google", passport.authenticate("google", {
  scope: ["email", "profile"]
}));

// 구글 로그인 콜백 처리
app.get("/oauth2/callback/google", passport.authenticate("google", {
  successRedirect: "/",
  failureRedirect: "/login", // 필요 시 프론트엔드 에러 페이지
}));

app.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    return res.success(req.user);
  }
  return res.status(401).error({ reason: "로그인이 필요합니다." });
});

// GitHub 로그인 시작
app.get("/oauth2/login/github", passport.authenticate("github", {
  scope: ["user:email"]
}));

// GitHub 콜백 처리
app.get("/oauth2/callback/github", passport.authenticate("github", {
  successRedirect: "/",
  failureRedirect: "/login",
}));

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