import * as userRepo from "../repositories/user.repository.js";

export const signUp = async (userData) => {
  return await userRepo.createUser(userData);
};

export const getUser = async (memberId) => {
  const user = await userRepo.findUserById(memberId);
  if (!user) {
    throw new Error("존재하지 않는 사용자입니다.");
  }
  return user;
};