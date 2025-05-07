import * as reviewService from "../services/review.service.js";
import { validateCreateReviewDto } from "../dtos/review.dto.js";

export const postReview = async (req, res, next) => {
   /*
    #swagger.summary = '리뷰 작성 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              mission_id: { type: "number" },
              member_id: { type: "number" },
              rating: { type: "number" },
              content: { type: "string" },
              store_id: { type: "number" }
            },
            required: ["mission_id", "member_id", "rating", "content", "store_id"]
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "리뷰 작성 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object"
          }
        }
      }
    };
  */
  try {
    const reviewData = validateCreateReviewDto(req.body);
    const reviewId = await reviewService.writeReview(reviewData);
    res.status(201).json({ message: "리뷰 작성 완료", reviewId });
  } catch (err) {
    next(err);
  }
};

export const getReviewsForStore = async (req, res, next) => {
   /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.parameters['storeId'] = { in: 'path', required: true, type: 'number' };
    #swagger.responses[200] = {
      description: "리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object"
          }
        }
      }
    };
  */
    try {
      const storeId = Number(req.params.storeId);
      const reviews = await reviewService.getStoreReviews(storeId);
      res.status(200).json({ reviews });
    } catch (err) {
      next(err);
    }
};