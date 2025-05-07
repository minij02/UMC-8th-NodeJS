import { listMyReviews } from "../services/userReview.service.js";

export const handleListMyReviews = async (req, res, next) => {
  /*
    #swagger.summary = '내 리뷰 목록 조회 API';
    #swagger.parameters['memberId'] = { in: 'path', required: true, type: 'number' };
    #swagger.parameters['cursor'] = { in: 'query', type: 'number' };
    #swagger.responses[200] = {
      description: "내 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object"
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