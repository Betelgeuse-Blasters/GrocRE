/* eslint-disable */

const deleteMealFromPlan = () => {};

const editMeal = async (meal) => {
  let data = {
    name: meal.recipeName,
    description: meal.recipeDescription,
    ingredients: meal.ingredients,
    servings: meal.servingSize,
    steps: meal.recipeSteps,
    nutritionFacts: meal.nutritionFacts,
    creatorId: meal.creatorId,
    mealPlanId: meal.mealPlanId,
  }

  const api = new Api('/meals');
  let response = await api.put(`/${meal.id}`, data);
  return response;
};

export const mealUtils = {
  deleteMealFromPlan,
  editMeal
};