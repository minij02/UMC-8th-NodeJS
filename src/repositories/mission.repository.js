import { prisma } from '../lib/prisma.js';

export const createMission = async ({ store_id, region_id, minimum_amount, reward_points, deadline_days }) => {
  const result = await prisma.mISSION.create({
    data: {
      store_id,
      region_id,
      minimum_amount,
      reward_points,
      deadline_days,
    },
  });
  return result.mission_id;
};

export const getMissionsByStoreId = async (storeId, cursor) => {
  const missions = await prisma.mISSION.findMany({
    where: {
      store_id: storeId,
      ...(cursor && { mission_id: { gt: cursor } }),
    },
    orderBy: { mission_id: 'asc' },
    take: 5,
  });
  return missions;
};