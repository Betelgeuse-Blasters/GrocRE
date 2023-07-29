import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

const seedDataConstructor = () => {
  return {
    firstname: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    userName: faker.internet.userName(),
  };
};
//written in part by mike g
const seedData = Array.from({ length: 5 }, seedDataConstructor);
async function main() {
  // ... you will write your Prisma Client queries here
  return await prisma.users.createMany({
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
