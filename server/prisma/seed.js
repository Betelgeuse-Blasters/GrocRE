import { PrismaClient } from "@prisma/client";
import { faker } from "faker-js/faker";
const prisma = new PrismaClient();

const seedData = ()=> {
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
        
      }

    ]
  }
}

async function main() {
  // ... you will write your Prisma Client queries here
  await prisma.users.createMany({
    data: 
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
