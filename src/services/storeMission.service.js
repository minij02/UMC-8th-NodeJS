import { getMissionsByStoreId } from "../repositories/storeMission.repository.js";
import { cursorPaginationDTO } from "../dtos/pagination.dto.js";

export const listStoreMissions = async (storeId, cursor) => {
  const data = await getMissionsByStoreId(storeId, cursor);
  return cursorPaginationDTO(data, "mission_id");
};