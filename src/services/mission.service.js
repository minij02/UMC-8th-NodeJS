import * as missionRepo from "../repositories/mission.repository.js";

export const registerMission = async (missionData) => {
  return await missionRepo.createMission(missionData);
};

export const getMissionsForStore = async (storeId) => {
    return await missionRepo.getMissionsByStoreId(storeId);
};