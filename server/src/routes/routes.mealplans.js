import express from "express";
import { body } from "express-validator";
import Controller from "../controller/controller.mealplans.js";
export const Router = express.Router();

Router.get('/?:id', Controller.getMealPlans);
Router.get('/', Controller.getMealPlans);

Router.post('/', Controller.createMealPlan);

Router.put('/:id', Controller.putMealPlan);


Router.put('/:id/recipe', Controller.addMealPlanRecipe);
Router.delete('/:id/recipe/:recipeid', Controller.deleteMealPlanRecipe);

Router.delete('/:id', Controller.deleteMealPlan);


export default { Router };