import express from "express";
import { body } from "express-validator";
import * as controller from "../controller/controller.sns.js";
const snsRouter = express.Router();

snsRouter.get('/posts', controller.getAllPosts)
snsRouter.put('/likes', controller.updateLikes)
snsRouter.get('/likes', controller.getLikes)
snsRouter.put('/save', controller.saveRecipe)
snsRouter.get('/save', controller.getSavedRecipe)
snsRouter.delete('/save', controller.unsaveRecipe)
snsRouter.get('/meals', controller.getMeals)
snsRouter.get('/mealplans', controller.getMealPlans)
snsRouter.post('/posts', controller.postMeal)



export {snsRouter};
