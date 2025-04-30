// const express = require('express')  // -> CommonJS
import express from 'express';          // -> ES Module
import dotenv from "dotenv";
import { register, getUserInfo } from "./controllers/user.controller.js";
import { createStore, handleListStoreMissions } from "./controllers/store.controller.js";
import { postReview } from "./controllers/review.controller.js";
import { createMission } from "./controllers/mission.controller.js";
import { handleListMyReviews } from "./controllers/userReview.controller.js";
import { postChallenge, getInProgressMissionsByMember, markMissionAsCompleted } from "./controllers/missionProgress.controller.js";

dotenv.config();

const app = express();
app.use(express.json());
const port = 3000;

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})