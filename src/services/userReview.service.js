import { getReviewsByMemberId } from "../repositories/userReview.repository.js";
import { cursorPaginationDTO } from "../dtos/pagination.dto.js";
import { findUserById } from "../repositories/user.repository.js";
import { NotFoundError } from "../error.js";

export const listMyReviews = async (memberId, cursor) => {
  const member = await findUserById(memberId);
  if (!member) {
    throw new NotFoundError("사용자");
  }
  const data = await getReviewsByMemberId(memberId, cursor);
  return cursorPaginationDTO(data, "review_id");
};