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
    let userId = null;
    let mealPlanId = Number(req.params.id) || null; //todo here
    let results = await Model.get(userId, mealPlanId);
    res.status(200).send(results);
  }

  async createMealPlan(req, res) {
    console.log(req.body);
    let userId = 1;
    let name = req.body.name;
    let description = req.body.description;
    let results = await Model.create(userId, name, description);
    res.status(200).send(results);
  }

  async putMealPlan(req, res) {
    let userId = 1;
    let data = {};
    data.userId = userId;
    data.mealPlanId = Number(req.params.id); //todo here
    data.name = req.body.name;
    data.description = req.body.description;

    let results = await Model.update(data);
    res.status(200).send(results);
  }

  async deleteMealPlan(req, res) {
    let userId = 1;
    let mealPlanId = Number(req.params.id); //todo here
    let results = await Model.delete(mealPlanId);
    res.status(200).send(results);
  }

  async addMealPlanRecipe(req, res){
    //validate ownership of mealplan
    //create copy of recipe
    //add copy to mealplan
    let mealPlanId = req.params.id;
    // get recipe info from body


  }
  async deleteMealPlanRecipe(req, res){

  }
}

export default new Controller();