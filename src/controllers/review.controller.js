import * as reviewService from "../services/review.service.js";
import { validateCreateReviewDto } from "../dtos/review.dto.js";

export const postReview = async (req, res, next) => {
  try {
    const reviewData = validateCreateReviewDto(req.body);
    const reviewId = await reviewService.writeReview(reviewData);
    res.status(201).json({ message: "리뷰 작성 완료", reviewId });
  } catch (err) {
    next(err);
  }
};

export const getReviewsForStore = async (req, res, next) => {
    try {
      const storeId = Number(req.params.storeId);
      const reviews = await reviewService.getStoreReviews(storeId);
      res.status(200).json({ reviews });
    } catch (err) {
      next(err);
    }
};