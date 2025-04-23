import * as reviewRepo from "../repositories/review.repository.js";

export const writeReview = async (reviewData) => {
  const storeExists = await reviewRepo.isStoreExist(reviewData.store_id);
  if (!storeExists) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  return await reviewRepo.addReview(reviewData);
};

export const getStoreReviews = async (storeId) => {
    return await reviewRepo.getReviewsByStoreId(storeId);
};