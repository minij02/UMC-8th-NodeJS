import * as progressService from "../services/missionProgress.service.js";
import { validateChallengeMissionDto } from "../dtos/missionProgress.dto.js";

export const postChallenge = async (req, res, next) => {
   /*
    #swagger.summary = '미션 도전 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              mission_id: { type: "number" },
              member_id: { type: "number" }
            },
            required: ["mission_id", "member_id"]
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "미션 도전 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "미션 도전 완료" },
              progressId: { type: "number", example: 2001 }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "입력값 오류",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "MP001" },
                  reason: { type: "string", example: "mission_id와 member_id는 필수입니다." }
                }
              }
            }
          }
        }
      }
    };
  */
  try {
    const data = validateChallengeMissionDto(req.body);
    const progressId = await progressService.challengeMission(data);
    res.status(201).json({ message: "미션 도전 완료", progressId });
  } catch (err) {
    next(err);
  }
};

export const getInProgressMissionsByMember = async (req, res, next) => {
   /*
    #swagger.summary = '진행 중인 미션 목록 조회 API';
    #swagger.parameters['memberId'] = {
      in: 'path',
      required: true,
      schema: { type: 'number', example: 2 }
    };
    #swagger.parameters['cursor'] = {
      in: 'query',
      required: false,
      schema: { type: 'number', example: 0 }
    };
    #swagger.responses[200] = {
      description: "진행 중인 미션 목록 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              missions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    title: { type: "string" },
                    deadline: { type: "string", format: "date" }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "memberId 오류",
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
                  reason: { type: "string", example: "유효하지 않은 memberId 입니다." }
                }
              }
            }
          }
        }
      }
    };
  */
  const memberId = Number(req.params.memberId);
  const cursor = req.query.cursor ? Number(req.query.cursor) : 0;

  if (isNaN(memberId)) {
    return res.status(400).json({ error: "유효하지 않은 memberId 입니다." });
  }

  try {
    const missions = await progressService.getInProgressMissions(memberId, cursor);
    res.status(200).json({ missions });
  } catch (err) {
    next(err);
  }
};

export const markMissionAsCompleted = async (req, res, next) => {
 /*
    #swagger.summary = '미션 완료 처리 API';
    #swagger.parameters['progressId'] = {
      in: 'path',
      required: true,
      schema: { type: 'number', example: 9 }
    };
    #swagger.responses[200] = {
      description: "미션 완료 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "미션이 완료 처리되었습니다." }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "progressId 오류",
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
                  reason: { type: "string", example: "유효하지 않은 progressId입니다." }
                }
              }
            }
          }
        }
      }
    };
  */
  const progressId = Number(req.params.progressId);
  if (isNaN(progressId)) {
    return res.status(400).json({ error: "유효하지 않은 progressId입니다." });
  }

  try {
    await progressService.completeMission(progressId);
    res.status(200).json({ message: "미션이 완료 처리되었습니다." });
  } catch (err) {
    next(err);
  }
};