import { validateCreateStoreDto } from "../dtos/store.dto.js";
import * as storeService from "../services/store.service.js";
import { listStoreMissions } from "../services/store.service.js";

export const createStore = async (req, res) => {
  try {
    const storeData = validateCreateStoreDto(req.body); // DTO로 유효성 검사
    const storeId = await storeService.addStore(storeData);
    res.status(201).json({ message: "Store created", storeId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const handleListStoreMissions = async (req, res) => {
  const storeId = Number(req.params.storeId);
  const cursor = req.query.cursor ? Number(req.query.cursor) : 0;

  if (isNaN(storeId)) {
    return res.status(400).json({ error: "유효하지 않은 storeId입니다." });
  }

  try {
    const result = await listStoreMissions(storeId, cursor);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};