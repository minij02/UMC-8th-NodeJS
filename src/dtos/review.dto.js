export const validateCreateReviewDto = (data) => {
    const { mission_id, member_id, rating, content, store_id } = data;
  
    if (!mission_id || !member_id || !rating || !content || !store_id) {
      throw new Error("모든 필드는 필수입니다.");
    }
  
    if (isNaN(mission_id) || isNaN(member_id) || isNaN(rating) || isNaN(store_id)) {
      throw new Error("mission_id, member_id, rating, store_id는 숫자여야 합니다.");
    }
  
    return {
      mission_id: Number(mission_id),
      member_id: Number(member_id),
      rating: Number(rating),
      content: String(content),
      store_id: Number(store_id),
    };
  };  