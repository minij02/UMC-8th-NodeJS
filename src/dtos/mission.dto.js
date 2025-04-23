export const validateCreateMissionDto = (data) => {
    const { store_id, region_id, minimum_amount, reward_points, deadline_days } = data;
  
    if (!store_id || !region_id || !minimum_amount || !reward_points || !deadline_days) {
      throw new Error("모든 필드는 필수입니다.");
    }
  
    if (
      isNaN(store_id) ||
      isNaN(region_id) ||
      isNaN(minimum_amount) ||
      isNaN(reward_points) ||
      isNaN(deadline_days)
    ) {
      throw new Error("숫자 타입 필드에 잘못된 값이 들어왔습니다.");
    }
  
    return {
      store_id: Number(store_id),
      region_id: Number(region_id),
      minimum_amount: Number(minimum_amount),
      reward_points: Number(reward_points),
      deadline_days: Number(deadline_days),
    };
  };  