import * as progressRepo from "../repositories/missionProgress.repository.js";

export const challengeMission = async (data) => {
  const alreadyChallenged = await progressRepo.hasAlreadyChallenged(data.member_id, data.mission_id);
  if (alreadyChallenged) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  return await progressRepo.challengeMission(data);
};