import { validateCreateStoreDto } from "../dtos/store.dto.js";
import * as storeService from "../services/store.service.js";
import { listStoreMissions } from "../services/store.service.js";

export const createStore = async (req, res, next) => {
   /*
    #swagger.summary = '상점 생성 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              store_name: { type: "string" },
              category: { type: "string" },
              address: { type: "string" },
              region_id: { type: "number" }
            },
            required: ["store_name", "category", "address", "region_id"]
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "상점 생성 성공 응답",
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
    const storeData = validateCreateStoreDto(req.body); // DTO로 유효성 검사
    const storeId = await storeService.addStore(storeData);
    res.status(201).json({ message: "Store created", storeId });
  } catch (err) {
    next(err);
  }
};

export const handleListStoreMissions = async (req, res, next) => {
   /*
    #swagger.summary = '상점 미션 목록 조회 API';
    #swagger.parameters['storeId'] = { in: 'path', type: 'number', required: true };
    #swagger.parameters['cursor'] = { in: 'query', type: 'number' };
    #swagger.responses[200] = {
      description: "미션 목록 응답",
      content: {
        "application/json": {
          schema: {
            type: "object"
          }
        }
      }
    };
  */
  const storeId = Number(req.params.storeId);
  const cursor = req.query.cursor ? Number(req.query.cursor) : 0;

  if (isNaN(storeId)) {
    return res.status(400).json({ error: "유효하지 않은 storeId입니다." });
  }

  try {
    const result = await listStoreMissions(storeId, cursor);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};