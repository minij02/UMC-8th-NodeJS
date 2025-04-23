import { validateCreateMissionDto } from "../dtos/mission.dto.js";
import * as missionService from "../services/mission.service.js";

export const createMission = async (req, res) => {
  try {
    const missionData = validateCreateMissionDto(req.body);
    const missionId = await missionService.registerMission(missionData);
    res.status(201).json({ message: "미션 등록 완료", missionId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};