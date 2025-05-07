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
              progressId: { type: "number" },
              message: { type: "string" }
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
    #swagger.summary = '진행 중인 미션 조회 API';
    #swagger.parameters['memberId'] = { in: 'path', type: 'number', required: true };
    #swagger.parameters['cursor'] = { in: 'query', type: 'number' };
    #swagger.responses[200] = {
      description: "미션 목록",
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
    #swagger.parameters['progressId'] = { in: 'path', type: 'number', required: true };
    #swagger.responses[200] = {
      description: "완료 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string" }
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