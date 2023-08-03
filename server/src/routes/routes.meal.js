import express from "express";
import { body } from "express-validator";
import { getRecipe } from '../controller/controller.meal.js';

const mealRouter = express.Router();

mealRouter.get('/getRecipe', getRecipe);

export { mealRouter };