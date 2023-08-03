import { db } from "../utils/db.server.js";
import crypto from 'crypto'

export const findUserByNickname = async (nickname) => {
  return await db.user.findUnique({
    where: { nickname },
  });
};
export const findUserByEmail = async (email) => {
  return await db.user.findUnique({
    where: { email },
  });
};
export const createUser = async (nickname, name, email, password) => {
// to be added later, securing passwords and hashing and stuff
  return await db.user.create({
    data: {
      name,
      nickname,
      email,
      password,
    },
  });
};

export const comparePassword = async (inputPassword, storedPassword) => {
  // You would typically compare hashed passwords
  return inputPassword === storedPassword;
};

export const createSession = async (userId) => {
  const sessionHash = crypto.createHash('sha256').update(`${userId}-${Date.now()}`).digest('hex');
  return await db.sessions.create({
    data: {
      userId,
      sessionHash,
    },
  });
};
