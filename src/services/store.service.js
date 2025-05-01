import * as storeRepo from "../repositories/store.repository.js";
import { getMissionsByStoreId } from "../repositories/mission.repository.js";
import { cursorPaginationDTO } from "../dtos/pagination.dto.js";
import { NotFoundError } from "../error.js";


export const addStore = async (storeData) => {
  return await storeRepo.createStore(storeData);
};

export const listStoreMissions = async (storeId, cursor) => {
  const exists = await storeRepo.isStoreExist(storeId);
  if (!exists) {
    throw new NotFoundError("가게");
  }

  const data = await getMissionsByStoreId(storeId, cursor);
  return cursorPaginationDTO(data, "mission_id");
};