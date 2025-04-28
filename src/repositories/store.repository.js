import { prisma } from '../config/db.js';

export const isStoreExist = async (storeId) => {
  const store = await prisma.sTORE.findUnique({
    where: { store_id: storeId },
  });
  return store !== null;
};

export const createStore = async ({ store_name, category, address, region_id }) => {
  const result = await prisma.sTORE.create({
    data: {
      store_name,
      category,
      address,
      region_id,
      rating: 0,
      is_open: true,
    },
  });
  return result.store_id;
};