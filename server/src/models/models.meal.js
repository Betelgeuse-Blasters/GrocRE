import { db } from "../utils/db.server.js";

export const getRecipebyID = async (mealID) => {
  const recipe = await db.recipe.findUnique({
    where: {
      id: parseInt(mealID),
    },
  });
  return recipe;
};
