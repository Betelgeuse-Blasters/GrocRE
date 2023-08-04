import Model from "../models/models.meals.js";

class Controller {

  constructor() {}

  async getMeals(req, res) {
    let userId = null;
    let mealId = Number(req.params.id) || null;
    let results = await Model.get(userId, mealId);
    res.status(200).send(results);
  }

  async createMeal(req, res) {
    let userId = 1;
    let data = {
      recipeName: req.body?.name || '',
      recipeDescription: req.body?.description || '',
      recipeSteps: req.body?.steps || [],
      servingSize: req.body?.servings || 0,
      ingredients: req.body?.ingredients || [["2", "cup", "flour"], ["1", "cup", "sugar"], ["1", "cup", "butter"], ["1", "cup", "milk"], ["1", "cup", "eggs"], ["1", "cup", "vanilla"]],
      nutritionFacts: req.body?.nutritionFacts || [],
      creatorId: req.body?.creatorId || userId,
      savedBy: req.body?.savedBy || {}
    };

    let results = await Model.create(data);
    res.status(200).send(results);
  }

  async putMeal(req, res) {
    let userId = 1;
    let data = {
      id: Number(req.params.id) || null,
      recipeName: req.body?.name || '',
      recipeDescription: req.body?.description || '',
      recipeSteps: req.body?.steps || [],
      servingSize: req.body?.servings || 0,
      ingredients: req.body?.ingredients || [["2", "cup", "flour"], ["1", "cup", "sugar"], ["1", "cup", "butter"], ["1", "cup", "milk"], ["1", "cup", "eggs"], ["1", "cup", "vanilla"]],
      nutritionFacts: req.body?.nutritionFacts || [],
      creatorId: req.body?.creatorId || userId,
      savedBy: req.body?.savedBy || {}
    };

    let results = await Model.update(data);
    res.status(200).send(results);
  }

  async deleteMeal(req, res) {
    let mealId = Number(req.params.id);
    let results = await Model.delete(mealId);
    res.status(200).send(results);
  }

}

export default new Controller();