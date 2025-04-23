import * as progressService from "../services/missionProgress.service.js";
import { validateChallengeMissionDto } from "../dtos/missionProgress.dto.js";

export const postChallenge = async (req, res) => {
  try {
    const data = validateChallengeMissionDto(req.body);
    const progressId = await progressService.challengeMission(data);
    res.status(201).json({ message: "미션 도전 완료", progressId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};