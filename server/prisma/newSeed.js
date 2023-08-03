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
  await prisma.sessions.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const users = [];
  for (let i = 0; i < 10; i++) {
    users.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    });
  }
  const createdUsers = await prisma.$transaction(
    users.map((item) => prisma.user.create({ data: item })),
  )
  // Create recipes
  const recipes = [];
  for (let i = 0; i < 20; i++) {
    recipes.push({
      recipeName: faker.lorem.words(3),
      recipeDescription: faker.lorem.sentence(),
      recipeSteps: JSON.stringify([faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence()]),
      servingSize: faker.number.int(6),
      nutritionFacts: JSON.stringify({ calories: faker.number.int(500), protein: faker.number.int(20) }),
      ingredients: JSON.stringify([
        { name: faker.lorem.words(1), quantity: faker.number.int(5) },
        { name: faker.lorem.words(1), quantity: faker.number.int(5) },
        { name: faker.lorem.words(1), quantity: faker.number.int(5) },
      ]),
      creatorId: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const createdRecipes = await prisma.$transaction(
    recipes.map((item) => prisma.recipe.create({ data: item })),
  )

  // Create meal plans
  const mealPlans = [];
  for (let i = 0; i < 5; i++) {
    mealPlans.push({
      name: `Meal Plan ${i + 1}`,
      description: faker.lorem.sentence(),
      userId: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  const createdMealPlans = await prisma.mealPlan.createMany({ data: mealPlans });

  // Create user saved meals and user created meals
  const userSavedMeals = [];
  const userCreatedMeals = [];
  for (const user of createdUsers) {
    for (let i = 0; i < 5; i++) {
      const randomRecipe = createdRecipes[Math.floor(Math.random() * recipes.length)];
      userSavedMeals.push({ userId: user.id, recipeId: randomRecipe.id });
      userCreatedMeals.push({ userId: user.id, recipeId: randomRecipe.id });
    }
  }
  console.log('saved meals ', userSavedMeals);
  await prisma.userSavedMeals.createMany({ data: userSavedMeals });
  await prisma.userCreatedMeals.createMany({ data: userCreatedMeals });

  // Create posts with likes, photos, and comments
  const posts = [];
  for (let i = 0; i < 10; i++) {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomMealPlan = createdMealPlans[Math.floor(Math.random() * createdMealPlans.length)];

    posts.push({
      title: faker.lorem.words(4),
      summary: faker.lorem.sentence(),
      createdBy: randomUser.id,
      mealId: randomRecipe.id,
      mealPlanId: randomMealPlan.id,
      type: faker.random.boolean(),
      userId: randomUser.id,
      likes: {
        createMany: {
          data: Array.from({ length: faker.number.int(10) }, () => ({
            postId: randomRecipe.id,
            isLike: faker.random.boolean(),
          })),
        },
      },
      photos: {
        createMany: {
          data: Array.from({ length: faker.number.int(5) }, () => ({
            postId: randomRecipe.id,
            url: faker.image.food(),
          })),
        },
      },
      comments: {
        createMany: {
          data: Array.from({ length: faker.number.int(5) }, () => ({
            postId: randomRecipe.id,
            content: faker.lorem.sentence(),
          })),
        },
      },
    });
  }
  await prisma.post.createMany({ data: posts });
}

createSampleData()
  .then(() => {
    console.log('Sample data successfully generated and inserted.');
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error('Error generating and inserting sample data:', error);
    prisma.$disconnect();
  });
