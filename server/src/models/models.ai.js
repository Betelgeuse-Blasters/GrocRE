import { db } from "../utils/db.server.js";

export const saveRecipe = async (recipeData, creatorId) => {
  const {
    recipeName,
    recipeDescription,
    recipeSteps,
    servingSize,
    nutritionFacts,
    ingredients,
  } = recipeData;

  const savedRecipe= await db.recipe.create({
    data: {
      recipeName,
      recipeDescription,
      recipeSteps,
      servingSize,
      nutritionFacts,
      ingredients,
      creatorId
    },
  });
  return savedRecipe
};

export const saveRecipetoUser = async (recipeId, userId) => {

  return await db.userSavedMeals.create({
    data: {
      userId,
      recipeId
    },
  });
};

export const unsaveRecipetoUser = async (recipeId, userId) => {
  const userSavedMeal = await db.userSavedMeals.findFirst({
    where: {
      userId,
      recipeId,
    },
  });

  if (userSavedMeal) {
    return await db.userSavedMeals.delete({
      where: { id: userSavedMeal.id },
    });
  }

  throw new Error('UserSavedMeal not found');
};

