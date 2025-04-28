import { prisma } from '../lib/prisma.js';

export const createUser = async ({ username, email, gender, birth_date }) => {
  const result = await prisma.mEMBER.create({
    data: {
      username,
      email,
      gender,
      birth_date,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
  return result.member_id;
};

export const findUserById = async (member_id) => {
  const user = await prisma.mEMBER.findUnique({
    where: { member_id },
  });
  return user;
};