import * as progressService from "../services/missionProgress.service.js";
import { validateChallengeMissionDto } from "../dtos/missionProgress.dto.js";

export const postChallenge = async (req, res, next) => {
  try {
    const data = validateChallengeMissionDto(req.body);
    const progressId = await progressService.challengeMission(data);
    res.status(201).json({ message: "미션 도전 완료", progressId });
  } catch (err) {
    next(err);
  }
};

export const getInProgressMissionsByMember = async (req, res, next) => {
  const memberId = Number(req.params.memberId);
  const cursor = req.query.cursor ? Number(req.query.cursor) : 0;

  if (isNaN(memberId)) {
    return res.status(400).json({ error: "유효하지 않은 memberId 입니다." });
  }

  try {
    const missions = await progressService.getInProgressMissions(memberId, cursor);
    res.status(200).json({ missions });
  } catch (err) {
    next(err);
  }
};

export const markMissionAsCompleted = async (req, res, next) => {
  const progressId = Number(req.params.progressId);
  if (isNaN(progressId)) {
    return res.status(400).json({ error: "유효하지 않은 progressId입니다." });
  }

  try {
    await progressService.completeMission(progressId);
    res.status(200).json({ message: "미션이 완료 처리되었습니다." });
  } catch (err) {
    next(err);
  }
};