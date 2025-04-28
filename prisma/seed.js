import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 지역 생성
  const region = await prisma.rEGION.create({
    data: { name: "서울" },
  });

  // 가게 생성
  const store = await prisma.sTORE.create({
    data: {
      store_name: "테스트 가게",
      category: "카페",
      address: "서울시 어딘가",
      region_id: region.region_id,
      rating: 0,
      is_open: true,
    },
  });

  // 회원 생성
  const member = await prisma.mEMBER.create({
    data: {
      username: "테스트회원",
      email: "test@example.com",
      gender: "MALE",
      birth_date: new Date("2000-01-01"),
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  // 미션 생성
  await prisma.mISSION.create({
    data: {
      store_id: store.store_id,
      region_id: region.region_id,
      minimum_amount: 10000,
      reward_points: 500,
      deadline_days: 7,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });