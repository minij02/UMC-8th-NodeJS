import * as reviewService from "../services/review.service.js";
import { validateCreateReviewDto } from "../dtos/review.dto.js";

export const postReview = async (req, res) => {
  try {
    const reviewData = validateCreateReviewDto(req.body);
    const reviewId = await reviewService.writeReview(reviewData);
    res.status(201).json({ message: "리뷰 작성 완료", reviewId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};