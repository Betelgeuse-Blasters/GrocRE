import express from "express";
import { body } from "express-validator";
import Controller from "../controller/controller.meals.js";
export const MealsRouter = express.Router();

MealsRouter.get('/?:id', Controller.getMeals);
MealsRouter.get('/', Controller.getMeals);

MealsRouter.post('/', Controller.createMeal);
MealsRouter.put('/:id', Controller.putMeal);
MealsRouter.delete('/:id', Controller.deleteMeal);


export default { MealsRouter };