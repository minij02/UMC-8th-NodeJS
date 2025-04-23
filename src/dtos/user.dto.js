export const validateSignUpDto = (data) => {
    const { username, email, gender, birth_date } = data;
  
    if (!username || !email || !gender || !birth_date) {
      throw new Error("모든 필드는 필수입니다.");
    }
  
    if (typeof username !== "string" || typeof email !== "string") {
      throw new Error("username과 email은 문자열이어야 합니다.");
    }
  
    if (!["MALE", "FEMALE", "OTHER"].includes(gender)) {
      throw new Error("성별은 MALE, FEMALE, OTHER 중 하나여야 합니다.");
    }
  
    return {
      username,
      email,
      gender,
      birth_date,
    };
  };  