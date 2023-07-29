import { PrismaClient } from "@prisma/client";

var globalForPrisma = global;

export var db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
