import { db } from "../utils/db.server.js";

/**
 * @TODO
 *
 *  - Response: Format responses to be consistent
 *
 *
 * Schema:
 * id, name, description, user, userId, recipes
 * posts, MealPlanToRecipe
 */
class Model {

  constructor() {}

  async get(userId, mealPlanId) {
    const where = {};
    if (userId) where.userId = userId;
    if (mealPlanId) where.id = mealPlanId;
    const config = { where: where, include: { recipes: true } };
    console.log(config);

    return db.MealPlan.findMany(config)
      .then((response) => response)
      .catch((err) => {
        console.log('getMealPlanError', err);
        return [];
      })
  }

  async create(userId, name, description) {
    if (!userId) return [];
    const config = {
      data: { userId, name, description }
    };
    return db.MealPlan.create(config)
      .then((response) => response)
      .catch((err) => {
        console.log('createMealPlanError', err);
        return [];
      })
  }

  async update({userId, mealPlanId, name, description}) {
    const config = {
      where: { id: mealPlanId, userId: userId },
      data: { name, description }
    };
    return db.MealPlan.update(config)
      .then((response) => response)
      .catch((err) => {
        console.log('updateMealPlanError', err);
        return [];
      })
  }

  async delete(userId, mealPlanId) {
    const config = {
      where: { userId: userId, id: mealPlanId }
    };
    return db.MealPlan.delete(config)
      .then((response) => response)
      .catch((err) => {
        console.log('deleteMealPlanError', err);
        return [];
      })
  }

  async addRecipe(userId, mealPlanId, recipeId) {
    // get the current recipes for the user and mealPlanId
    const config = {
      data: { recipes: { connect: { id: recipeId } }},
      where: { id: mealPlanId }
    };

    let results = await db.MealPlan.update(config)
    return results;
  }

  async removeRecipe(userId, mealPlanId, recipeId) {
    const config = {
      data: { recipes: { disconnect: { id: recipeId } }},
      where: { id: mealPlanId }
    };

    let results = await db.MealPlan.update(config)
    return results;

    //MealPlanToRecipe
    // const config = {
    //   where:{ mealPlanId, recipeId }
    // };
    // return db.MealPlanToRecipe.delete(config).then((response) => response).catch((err) => {
    //   console.log('removeRecipeError', err);
    //   return [];
    // });
  }
}



export default new Model();