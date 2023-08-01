import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

const seedDataConstructor = () => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };
};
//written in part by mike G
const seedData = Array.from({ length: 5 }, seedDataConstructor);
async function main() {
  // ... you will write your Prisma Client queries here
  return await prisma.user.createMany({
    data: seedData,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
