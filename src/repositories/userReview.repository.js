import { prisma } from '../lib/prisma.js';

export const getReviewsByMemberId = async (memberId, cursor) => {
  const reviews = await prisma.rEVIEW.findMany({
    where: {
      member_id: memberId,
      ...(cursor && { review_id: { gt: cursor } }),
    },
    include: {
      mission: {
        include: {
          store: true,
        },
      },
    },
    orderBy: { review_id: 'asc' },
    take: 5,
  });

  return reviews.map((review) => ({
    review_id: review.review_id,
    rating: review.rating,
    content: review.content,
    created_at: review.created_at,
    store_name: review.mission.store.store_name,
  }));
};