export const getMealPlanIngredients = (mealPlan) => {
  if (!mealPlan || !Array.isArray(mealPlan.recipes)) return [];
  let ingredients = [];
  console.log('mealPlan', mealPlan);
  mealPlan.recipes.forEach((recipe) => {
    ingredients.push(...recipe.ingredients);
  });

  return ingredients;
}

export const getMealPlansIngredients = (mealPlans) => {
  if (!mealPlans || !Array.isArray(mealPlans)) return [];
  let ingredients = [];

  mealPlans.forEach((mealPlan) => {
    ingredients.push(...getMealPlanIngredients(mealPlan));
  });
};

export const getMealPlan = (mealPlans, id) => {
  if (!mealPlans || !Array.isArray(mealPlans)) return {};
  return mealPlans.find((mealPlan) => mealPlan.id == id);
};

export const getMenuItems = (mealPlans) => {
  let results = [];
  if (!mealPlans || !Array.isArray(mealPlans)) return results;

  mealPlans.forEach((mealPlan) => {
    results.push({ key: mealPlan.id, label: mealPlan.name});
  });

  return results;
}

