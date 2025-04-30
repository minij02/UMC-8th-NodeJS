import * as reviewRepo from "../repositories/review.repository.js";
import * as storeRepo from "../repositories/store.repository.js";
import { NotFoundError } from "../error.js";

export const writeReview = async (reviewData) => {
  const storeExists = await storeRepo.isStoreExist(reviewData.store_id);
  if (!storeExists) {
    throw new NotFoundError("가게");
  }

  return await reviewRepo.addReview(reviewData);
};

export const getStoreReviews = async (storeId) => {
    return await reviewRepo.getReviewsByStoreId(storeId);
};