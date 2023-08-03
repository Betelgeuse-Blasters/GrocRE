import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function createSampleData() {
  // Clear existing data
  await prisma.likesDislikes.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.photo.deleteMany();
  await prisma.post.deleteMany();
  await prisma.mealPlanToRecipe.deleteMany();
  await prisma.userSavedMeals.deleteMany();
  await prisma.userCreatedMeals.deleteMany();
  await prisma.mealPlan.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const users = [];
  for (let i = 0; i < 10; i++) {
    users.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      nickname: faker.internet.userName(),
      password: faker.internet.password(),
    });
  }
  const createdUsers = await prisma.$transaction(
    users.map((item) => prisma.user.create({ data: item }))
  );
  // Create recipes
  const recipes = [];
  for (let i = 0; i < 20; i++) {
    recipes.push({
      recipeName: faker.lorem.words(3),
      recipeDescription: faker.lorem.sentence(),
      recipeSteps: [
        `1. ${faker.lorem.sentence()}`,
        `2. ${faker.lorem.sentence()}`,
        `3. ${faker.lorem.sentence()}`,
      ],
      servingSize: faker.number.int({ min: 1, max: 6 }),
      nutritionFacts: {
        calories: faker.number.int({ min: 100, max: 500 }),
        totalFat: faker.number.int({ min: 10, max: 30 }),
        saturatedFat: faker.number.int({ min: 5, max: 15 }),
        cholesterol: faker.number.int({ min: 30, max: 100 }),
        sodium: faker.number.int({ min: 100, max: 500 }),
        carbohydrates: faker.number.int({ min: 20, max: 100 }),
        fiber: faker.number.int({ min: 2, max: 10 }),
        sugars: faker.number.int({ min: 5, max: 20 }),
        protein: faker.number.int({ min: 5, max: 40 }),
      },
      ingredients: [
        [
          faker.number.int({ min: 0.1, max: 5 }).toFixed(1),
          "cup",
          faker.commerce.product(),
        ],
        [
          faker.number.int({ min: 0.1, max: 5 }).toFixed(1),
          "tbsp",
          faker.commerce.product(),
        ],
        [
          faker.number.int({ min: 0.1, max: 5 }).toFixed(1),
          "tsp",
          faker.commerce.product(),
        ],
      ],
    });
  }

  const createdRecipes = await prisma.$transaction(
    recipes.map((item) => prisma.recipe.create({ data: item }))
  );

  // Create meal plans
  const mealPlans = [];
  for (let i = 0; i < 5; i++) {
    console.log(
      "RANDOM USER ID: ",
      createdUsers[Math.floor(Math.random() * users.length)].id
    );
    mealPlans.push({
      name: `Meal Plan ${i + 1}`,
      description: faker.lorem.sentence(),
      userId: createdUsers[Math.floor(Math.random() * users.length)].id,
    });
  }
  const createdMealPlans = await prisma.$transaction(
    mealPlans.map((item) => prisma.mealPlan.create({ data: item }))
  );

  // Create user saved meals and user created meals
  const userSavedMeals = [];
  const userCreatedMeals = [];
  for (const user of createdUsers) {
    for (let i = 0; i < 5; i++) {
      const randomRecipe =
        createdRecipes[Math.floor(Math.random() * recipes.length)];
      userSavedMeals.push({ userId: user.id, recipeId: randomRecipe.id });
      userCreatedMeals.push({ userId: user.id, recipeId: randomRecipe.id });
    }
  }
  await prisma.userSavedMeals.createMany({ data: userSavedMeals });
  await prisma.userCreatedMeals.createMany({ data: userCreatedMeals });

  // Create posts with likes, photos, and comments
  const posts = [];
  for (let i = 0; i < 10; i++) {
    const randomRecipe =
      createdRecipes[Math.floor(Math.random() * recipes.length)];
    const randomUser = createdUsers[Math.floor(Math.random() * users.length)];
    const randomMealPlan =
      createdMealPlans[Math.floor(Math.random() * createdMealPlans.length)];

    posts.push({
      title: faker.lorem.words(4),
      summary: faker.lorem.sentence(),
      mealId: randomRecipe.id,
      mealPlanId: randomMealPlan.id,
      type: faker.datatype.boolean(),
      userId: randomUser.id,
    });
  }
  await prisma.$transaction(
    posts.map((item) => prisma.post.create({ data: item }))
  );
}

createSampleData()
  .then(() => {
    console.log("Sample data successfully generated and inserted.");
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error("Error generating and inserting sample data:", error);
    prisma.$disconnect();
  });
