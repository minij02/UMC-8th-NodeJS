import { validateCreateStoreDto } from "../dtos/store.dto.js";
import * as storeService from "../services/store.service.js";

export const createStore = async (req, res) => {
  try {
    const storeData = validateCreateStoreDto(req.body); // DTO로 유효성 검사
    const storeId = await storeService.addStore(storeData);
    res.status(201).json({ message: "Store created", storeId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};