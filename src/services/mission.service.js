import * as missionRepo from "../repositories/mission.repository.js";
import { getMissionsByStoreId } from "../repositories/storeMission.repository.js";
import { cursorPaginationDTO } from "../dtos/pagination.dto.js";

export const registerMission = async (missionData) => {
  return await missionRepo.createMission(missionData);
};

export const getMissionsForStore = async (storeId) => {
    return await missionRepo.getMissionsByStoreId(storeId);
};