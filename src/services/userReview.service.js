import { getReviewsByMemberId } from "../repositories/userReview.repository.js";
import { cursorPaginationDTO } from "../dtos/pagination.dto.js";

export const listMyReviews = async (memberId, cursor) => {
  const data = await getReviewsByMemberId(memberId, cursor);
  return cursorPaginationDTO(data, "review_id");
};