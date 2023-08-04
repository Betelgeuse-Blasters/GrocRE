import Model from "../models/models.mealplans.js";
import { validationResult } from "express-validator";

/**
 * @TODO
 *  - ErrorHandling: If mealplanid can't be conv to a number
 *  - ErrorHandling: If userId is not provided
 *  - ErrorHandling: Validate recipe id exists
 */

class Controller {

  constructor() {}

  async getMealPlans(req, res) {
    let userId = req.userInfo.id || null;
    let mealPlanId = Number(req.params.id) || null; //todo here
    let results = await Model.get(userId, mealPlanId);
    res.status(200).send(results);
  }

  async createMealPlan(req, res) {
    let userId = req.userInfo.id || null;
    let name = req.body.name;
    let description = req.body.description;
    let results = await Model.create(userId, name, description);
    res.status(200).send(results);
  }

  async putMealPlan(req, res) {
    let userId = req.userInfo.id || null;
    let data = {};
    data.userId = userId;
    data.mealPlanId = Number(req.params.id); //todo here
    data.name = req.body.name;
    data.description = req.body.description;

    let results = await Model.update(data);
    res.status(200).send(results);
  }

  async deleteMealPlan(req, res) {
    let userId = req.userInfo.id || 1;
    let mealPlanId = Number(req.params.id); //todo here
    let results = await Model.delete(userId, mealPlanId);
    res.status(200).send(results);
  }

  async addMealPlanRecipe(req, res){
    // NOTE:: This connects the recipe to the meal plan, it doesn't create a new recipe
    let userId = req.userInfo.id || null;
    let results = await Model.addRecipe(userId, Number(req.params.id), Number(req.params.recipeId));
    res.status(200).send(results);
  }

  async deleteMealPlanRecipe(req, res){
    let userId = req.userInfo.id || null;
    let results = Model.removeRecipe(userId, Number(req.params.id), Number(req.params.recipeId));
    res.status(200).send(results);
  }
}

export default new Controller();