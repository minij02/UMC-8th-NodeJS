import * as progressRepo from "../repositories/missionProgress.repository.js";
import { findUserById } from "../repositories/user.repository.js";
import { cursorPaginationDTO } from "../dtos/pagination.dto.js";
import { AlreadyChallengedError, NotFoundError } from "../error.js";

export const challengeMission = async (data) => {
  const alreadyChallenged = await progressRepo.hasAlreadyChallenged(data.member_id, data.mission_id);
  if (alreadyChallenged) {
    throw new AlreadyChallengedError(data);
  }

  return await progressRepo.challengeMission(data);
};

export const getInProgressMissions = async (memberId, cursor) => {
  const member = await findUserById(memberId);
  if (!member) {
    throw new NotFoundError("사용자", { memberId });
  }

  const data = await progressRepo.getInProgressMissionsByMemberId(memberId, cursor);
  return cursorPaginationDTO(data, "progress_id");
};

export const completeMission = async (progressId) => {
  const success = await progressRepo.completeMissionProgress(progressId);
  if (!success) throw new NotFoundError("미션 도전 정보", { progressId });
};