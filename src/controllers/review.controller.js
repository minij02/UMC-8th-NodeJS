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
      description: "리뷰 작성 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "리뷰 작성 완료" },
              reviewId: { type: "number", example: 101 }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "입력 값 오류",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R001" },
                  reason: { type: "string", example: "rating 값은 필수입니다." },
                  data: { type: "object", nullable: true }
                }
              },
              success: { type: "null", example: null }
            }
          }
        }
      }
    };
    #swagger.responses[500] = {
      description: "서버 내부 오류",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "INTERNAL_ERROR" },
                  reason: { type: "string", example: "Unexpected server error" },
                  data: { type: "object", nullable: true }
                }
              },
              success: { type: "null", example: null }
            }
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
    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      schema: { type: 'number', example: 5 }
    };
    #swagger.responses[200] = {
      description: "리뷰 목록 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              reviews: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    content: { type: "string" },
                    rating: { type: "number" },
                    store_id: { type: "number" },
                    member_id: { type: "number" }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "storeId 오류",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "INVALID_PARAM" },
                  reason: { type: "string", example: "유효하지 않은 storeId입니다." }
                }
              }
            }
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