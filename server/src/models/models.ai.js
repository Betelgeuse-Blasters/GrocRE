import { db } from "../utils/db.server.js";

export const saveRecipe = async (recipeData) => {
  const {
    recipeName,
    recipeDescription,
    recipeSteps,
    servingSize,
    nutritionFacts,
    ingredients,
  } = recipeData;

  return await db.threeDmeal.create({});
};
