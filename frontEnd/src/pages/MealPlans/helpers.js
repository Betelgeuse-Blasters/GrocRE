import FractionFactory from '../../Helper/FractionFactory.js';

export const getMealPlanIngredients = (mealPlan) => {
  if (!mealPlan || !Array.isArray(mealPlan.recipes)) return [];
  let ingredients = [];
  mealPlan.recipes.forEach((recipe) => {
    // let ff = FractionFactory(recipe.ingredients.shift());
    // ff = [ff, ...recipe.ingredients]
    // console.log(ff);
    // ingredients.push(ff);
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

export const getNavMenuItems = (mealPlans) => {
  let results = [];
  if (!mealPlans || !Array.isArray(mealPlans)) return results;

  mealPlans.forEach((mealPlan) => {
    results.push({ key: mealPlan.id, label: mealPlan.name});
  });

  return results;
}

export const getTabMenuItems = (mealPlan) => {
  let results = [];
  if (!mealPlan) return results;
  if (!mealPlan.recipes || !Array.isArray(mealPlan.recipes)) return results;

  mealPlan.recipes.forEach((recipe) => {
    results.push({ key: recipe.id, label: recipe.recipeName, children: 'hellomuddah hellofaddah' + recipe.id});
  });

  return results;
}

