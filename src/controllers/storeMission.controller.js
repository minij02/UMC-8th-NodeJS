import { listStoreMissions } from "../services/storeMission.service.js";

export const handleListStoreMissions = async (req, res) => {
  const storeId = Number(req.params.storeId);
  const cursor = req.query.cursor ? Number(req.query.cursor) : 0;

  if (isNaN(storeId)) {
    return res.status(400).json({ error: "유효하지 않은 storeId입니다." });
  }

  const result = await listStoreMissions(storeId, cursor);
  res.status(200).json(result);
};