import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

/* db.$use(async (params, next) => {
  console.log(params);
  return next(params);
}); */

export default db;

