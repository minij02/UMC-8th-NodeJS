import { prisma } from '../lib/prisma.js';

// 이미 도전 중인지 확인
export const hasAlreadyChallenged = async (member_id, mission_id) => {
  const missionProgress = await prisma.mISSIONPROGRESS.findFirst({
    where: {
      member_id,
      mission_id,
    },
  });
  return missionProgress !== null;
};

// 도전 정보 등록
export const challengeMission = async ({ mission_id, member_id }) => {
  const result = await prisma.mISSIONPROGRESS.create({
    data: {
      mission_id,
      member_id,
      status: 'IN_PROGRESS',
      requested_at: new Date(),
    },
  });
  return result.progress_id;
};

// 도전 중인 미션 조회
export const getInProgressMissionsByMemberId = async (memberId, cursor) => {
  const progresses = await prisma.mISSIONPROGRESS.findMany({
    where: {
      member_id: memberId,
      status: 'IN_PROGRESS',
      ...(cursor && { progress_id: { gt: cursor } }),
    },
    include: {
      mission: {
        include: {
          store: true,
        },
      },
    },
    orderBy: { progress_id: 'asc' },
    take: 5,
  });
  return progresses;
};

// 미션 완료 처리
export const completeMissionProgress = async (progressId) => {
  const result = await prisma.mISSIONPROGRESS.update({
    where: { progress_id: progressId },
    data: {
      status: 'COMPLETED',
      completed_at: new Date(),
    },
  });
  return !!result;
};