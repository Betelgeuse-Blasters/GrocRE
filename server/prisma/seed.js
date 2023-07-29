import { PrismaClient } from "@prisma/client";
import { faker } from "faker-js/faker";
const prisma = new PrismaClient();

const seedDataConstructor = () => {
  return {
    firstname: faker.dataType.string(),
    lastName: faker.dataType.string(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    posts: [
      {
        title: faker.dataType.string(),
        body: faker.dataType.string(),
        createdAt: faker.date.past(),
      },
    ],
  };
};
//written in part by mike g
const seedData = faker.helpers.multiple(seedDataConstructor, { count: 5 });
async function main() {
  // ... you will write your Prisma Client queries here
  await prisma.users.createMany({
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
