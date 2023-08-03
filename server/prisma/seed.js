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

const seedRecipes = () => {
  const foodItems = ["Pizza", "Burger", "Pasta", "Sushi", "Salad", "Ice Cream", "Steak", "Tacos", "Chicken Wings", "Fried Rice", "Chocolate", "Fruit Salad", "Sandwich", "Soup", "Donut", "Popcorn", "Pancakes", "Waffles", "Cheese", "Cupcake"];
  let ingredients = () => { return [faker.number.int({ max: 5 }), faker.helpers.arrayElement(foodItems), faker.lorem.words()]}

  return {
    creatorId: 1,
    recipeName: faker.lorem.words(),
    recipeDescription: faker.lorem.paragraph(),
    recipeSteps: Array.from({ length: 5 }, faker.lorem.paragraph),
    servingSize: faker.number.int({max:5 }),
    nutritionFacts: Array.from({ length: 5 }, faker.lorem.words),
    ingredients: Array(5).fill((() => ingredients())()),
  }
}

async function main() {
  let user = prisma.user.createMany({
    data: seedData,
  });

  let recipe = prisma.recipe.createMany({
    data: Array.from({ length: 5 }, seedRecipes),
  });

  // ... you will add your Prisma Client queries here
  return await Promise.all([user, recipe]);
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


