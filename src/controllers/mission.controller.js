import { validateCreateMissionDto } from "../dtos/mission.dto.js";
import * as missionService from "../services/mission.service.js";

export const createMission = async (req, res, next) => {
   /*
    #swagger.summary = '미션 생성 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              store_id: { type: "number" },
              region_id: { type: "number" },
              minimum_amount: { type: "number" },
              reward_points: { type: "number" },
              deadline_days: { type: "number" }
            },
            required: ["store_id", "region_id", "minimum_amount", "reward_points", "deadline_days"]
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "미션 등록 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string" },
              missionId: { type: "number" }
            }
          }
        }
      }
    };
  */
  try {
    const missionData = validateCreateMissionDto(req.body);
    const missionId = await missionService.registerMission(missionData);
    res.status(201).json({ message: "미션 등록 완료", missionId });
  } catch (err) {
    next(err);
  }
};

export const getMissionsByStore = async (req, res, next) => {
  /*
    #swagger.summary = '매장 미션 목록 조회 API';
    #swagger.parameters['storeId'] = { in: 'path', type: 'number', required: true };
    #swagger.responses[200] = {
      description: "미션 목록 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              missions: {
                type: "array",
                items: { type: "object" }
              }
            }
          }
        }
      }
    };
  */
    try {
      const storeId = Number(req.params.storeId);
      const missions = await missionService.getMissionsForStore(storeId);
      res.status(200).json({ missions });
    } catch (err) {
      next(err);
    }
};