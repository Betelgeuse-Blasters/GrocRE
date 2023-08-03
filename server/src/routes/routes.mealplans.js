import express from "express";
import { body } from "express-validator";
import Controller from "../controller/controller.mealplans.js";
export const MealPlansRouter = express.Router();

MealPlansRouter.get('/?:id', Controller.getMealPlans);
MealPlansRouter.get('/', Controller.getMealPlans);

MealPlansRouter.post('/', Controller.createMealPlan);

MealPlansRouter.put('/:id', Controller.putMealPlan);


MealPlansRouter.put('/:id/recipe/:recipeId', Controller.addMealPlanRecipe);
MealPlansRouter.delete('/:id/recipe/:recipeId', Controller.deleteMealPlanRecipe);

MealPlansRouter.delete('/:id', Controller.deleteMealPlan);


export default { MealPlansRouter };