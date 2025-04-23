import * as storeRepo from "../repositories/store.repository.js";

export const addStore = async (storeData) => {
  return await storeRepo.createStore(storeData);
};