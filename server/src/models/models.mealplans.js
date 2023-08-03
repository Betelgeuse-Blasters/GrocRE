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

  async delete({userId, mealPlanId}) {
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
      where: { userId: userId, id: mealPlanId }
    };

    let results = await db.MealPlan.update(config)
    console.log('add recipe results', results);
    // let recipeIds = await db.MealPlan.findMany(config);


    // console.log('recipeIds', JSON.stringify(recipeIds[0]));
    // return db.MealPlanToRecipe.create(config)
    //   .then((response) => response)
    //   .catch((err) => {
    //     console.log('addRecipeError', err);
    //     return [];
    //   });
  }

  async removeRecipe(mealPlanId, recipeId) {
    //MealPlanToRecipe
    const config = {
      where:{ mealPlanId, recipeId }
    };
    return db.MealPlanToRecipe.delete(config).then((response) => response).catch((err) => {
      console.log('removeRecipeError', err);
      return [];
    });
  }
}



export default new Model();