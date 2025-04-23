export const validateChallengeMissionDto = (data) => {
    const { mission_id, member_id } = data;
  
    if (!mission_id || !member_id) {
      throw new Error("mission_id와 member_id는 필수입니다.");
    }
  
    if (isNaN(mission_id) || isNaN(member_id)) {
      throw new Error("숫자 형식이어야 합니다.");
    }
  
    return {
      mission_id: Number(mission_id),
      member_id: Number(member_id),
    };
  };  