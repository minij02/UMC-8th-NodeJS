import { prisma } from '../config/db.js';

// 리뷰 추가
export const addReview = async ({ mission_id, member_id, rating, content }) => {
  const result = await prisma.rEVIEW.create({
    data: {
      mission_id,
      member_id,
      rating,
      content,
      created_at: new Date(),
    },
  });
  return result.review_id;
};

// 리뷰 목록 조회
export const getReviewsByStoreId = async (storeId) => {
  const reviews = await prisma.rEVIEW.findMany({
    where: {
      mission: {
        store_id: storeId,
      },
    },
    include: {
      member: { select: { username: true } },
      reviewImages: { select: { image_url: true } },
    },
    orderBy: { created_at: 'desc' },
  });

  return reviews.map((review) => ({
    review_id: review.review_id,
    rating: review.rating,
    content: review.content,
    created_at: review.created_at,
    nickname: review.member.username,
    image_urls: review.reviewImages.map((img) => img.image_url).join(','),
  }));
};