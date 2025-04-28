import * as storeRepo from "../repositories/store.repository.js";

export const addStore = async (storeData) => {
  return await storeRepo.createStore(storeData);
};

export const listStoreMissions = async (storeId, cursor) => {
  const data = await getMissionsByStoreId(storeId, cursor);
  return cursorPaginationDTO(data, "mission_id");
};