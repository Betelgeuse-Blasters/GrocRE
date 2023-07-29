import express from "express";
import { body } from "express-validator";
import { getRecipe } from '../controller/controller.ai.js';

const aiRouter = express.Router();

aiRouter.post('/getRecipe', getRecipe);

export { aiRouter };