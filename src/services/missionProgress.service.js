import * as progressRepo from "../repositories/missionProgress.repository.js";
import { cursorPaginationDTO } from "../dtos/pagination.dto.js";

export const challengeMission = async (data) => {
  const alreadyChallenged = await progressRepo.hasAlreadyChallenged(data.member_id, data.mission_id);
  if (alreadyChallenged) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  return await progressRepo.challengeMission(data);
};

export const getInProgressMissions = async (memberId, cursor) => {
  const data = await progressRepo.getInProgressMissionsByMemberId(memberId, cursor);
  return cursorPaginationDTO(data, "progress_id");
};

export const completeMission = async (progressId) => {
  const success = await progressRepo.completeMissionProgress(progressId);
  if (!success) throw new Error("해당 미션 도전 정보를 찾을 수 없습니다.");
};