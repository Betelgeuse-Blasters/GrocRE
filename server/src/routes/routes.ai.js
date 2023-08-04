import express from "express";
import { body } from "express-validator";
import { getRecipe, likeRecipe, unlikeRecipe } from '../controller/controller.ai.js';

const aiRouter = express.Router();

aiRouter.post('/getRecipe', getRecipe);
aiRouter.post('/likeRecipe', likeRecipe);
aiRouter.post('/unlikeRecipe', unlikeRecipe);

export { aiRouter };