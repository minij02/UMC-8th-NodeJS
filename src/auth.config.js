import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { prisma } from "./config/db.js";

dotenv.config();

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((member) => cb(null, member))
      .catch((err) => cb(err));
  }
);

const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const user = await prisma.mEMBER.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }

  const created = await prisma.mEMBER.create({
    data: {
      username: profile.displayName ?? `user_${Date.now()}`, // 필수
      email,
      name: profile.displayName,
      gender: "OTHER", // Enum 값으로
      birth_date: new Date(1970, 0, 1),
      address: "추후 수정",
      detailAddress: "추후 수정",
      phoneNumber: "추후 수정",
    },
  });

  return { id: created.member_id, email: created.email, name: created.name };
};

export const githubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/github",
    scope: ["user:email"],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value;
      if (!email) {
        return done(new Error("GitHub 프로필에 이메일이 없습니다."));
      }

      // 회원 존재 여부 확인
      let user = await prisma.MEMBER.findFirst({ where: { email } });

      if (!user) {
        user = await prisma.MEMBER.create({
          data: {
            username: profile.username ?? `github_${Date.now()}`,
            email,
            name: profile.displayName ?? profile.username,
            gender: "OTHER",
            birth_date: new Date(1970, 0, 1),
            address: "추후 수정",
            detailAddress: "추후 수정",
            phoneNumber: "추후 수정",
          },
        });
      }

      return done(null, { id: user.member_id, email: user.email, name: user.name });
    } catch (err) {
      done(err);
    }
  }
);