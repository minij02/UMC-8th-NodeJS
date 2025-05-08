import { listMyReviews } from "../services/userReview.service.js";

export const handleListMyReviews = async (req, res, next) => {
  /*
    #swagger.summary = '내 리뷰 목록 조회 API';
    #swagger.parameters['memberId'] = {
      in: 'path',
      required: true,
      schema: { type: 'number', example: 7 }
    };
    #swagger.parameters['cursor'] = {
      in: 'query',
      required: false,
      schema: { type: 'number', example: 0 }
    };
    #swagger.responses[200] = {
      description: "내 리뷰 목록 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    content: { type: "string" },
                    rating: { type: "number" },
                    mission_id: { type: "number" },
                    store_id: { type: "number" }
                  }
                }
              },
              pagination: {
                type: "object",
                properties: {
                  cursor: { type: "number", nullable: true }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "memberId 파라미터 오류",
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
                  reason: { type: "string", example: "유효하지 않은 memberId입니다." }
                }
              },
              success: { type: "null", example: null }
            }
          }
        }
      }
    };
  */
  const memberId = Number(req.params.memberId);
  const cursor = req.query.cursor ? Number(req.query.cursor) : 0;

  if (isNaN(memberId)) {
    return res.status(400).json({ error: "유효하지 않은 memberId입니다." });
  }

  try {
    const result = await listMyReviews(memberId, cursor);
    res.status(200).success(result);
  } catch (err) {
    next(err);
  }
};