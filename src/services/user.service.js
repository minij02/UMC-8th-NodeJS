import * as userRepo from "../repositories/user.repository.js";
import { NotFoundError } from "../error.js";

export const signUp = async (userData) => {
  return await userRepo.createUser(userData);
};

export const getUser = async (memberId) => {
  const user = await userRepo.findUserById(memberId);
  if (!user) {
    throw new NotFoundError("사용자");
  }
  return user;
};