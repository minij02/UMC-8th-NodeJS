import * as reviewRepo from "../repositories/review.repository.js";
import * as storeRepo from "../repositories/store.repository.js";
import * as missionRepo from "../repositories/mission.repository.js";
import * as userRepo from "../repositories/user.repository.js";
import { NotFoundError } from "../error.js";

export const writeReview = async (reviewData) => {
  const { store_id, mission_id, member_id } = reviewData;

  const member = await userRepo.findUserById(member_id);
  if (!member) throw new NotFoundError("사용자", { member_id });

  const mission = await missionRepo.findMissionById(mission_id);
  if (!mission) throw new NotFoundError("미션", { mission_id });

  const storeExists = await storeRepo.isStoreExist(reviewData.store_id);
  if (!storeExists) {
    throw new NotFoundError("가게");
  }

  return await reviewRepo.addReview(reviewData);
};

export const getStoreReviews = async (storeId) => {
    return await reviewRepo.getReviewsByStoreId(storeId);
};