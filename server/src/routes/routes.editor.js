import express from "express";
import { body } from "express-validator";
import Controller from "../controller/controller.editor.js";
export const editorRouter = express.Router();



editorRouter.get('/api/login', Controller.userInfo);

editorRouter.get('/api/mealplans', Controller.getMealPlans);

editorRouter.get('/api/mealplans/:id', Controller.getMealPlan);

editorRouter.post('/api/mealplans', Controller.postMealPlan);