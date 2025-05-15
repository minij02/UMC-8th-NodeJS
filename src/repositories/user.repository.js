import { prisma } from '../config/db.js';

export const upsertUser = async ({ username, email, gender, birth_date }) => {
  const existing = await prisma.mEMBER.findUnique({ where: { email } });

  const result = await prisma.mEMBER.upsert({
    where: { email },
    update: {
      username,
      gender,
      birth_date,
      updated_at: new Date(),
    },
    create: {
      username,
      email,
      gender,
      birth_date,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  return {
    member_id: result.member_id,
    isNew: existing === null,
  };
};

export const findUserById = async (member_id) => {
  const user = await prisma.mEMBER.findUnique({
    where: { member_id },
  });
  return user;
};