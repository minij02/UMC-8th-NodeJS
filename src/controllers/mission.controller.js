import { validateCreateMissionDto } from "../dtos/mission.dto.js";
import * as missionService from "../services/mission.service.js";

export const createMission = async (req, res, next) => {
  try {
    const missionData = validateCreateMissionDto(req.body);
    const missionId = await missionService.registerMission(missionData);
    res.status(201).json({ message: "미션 등록 완료", missionId });
  } catch (err) {
    next(err);
  }
};

export const getMissionsByStore = async (req, res, next) => {
    try {
      const storeId = Number(req.params.storeId);
      const missions = await missionService.getMissionsForStore(storeId);
      res.status(200).json({ missions });
    } catch (err) {
      next(err);
    }
};