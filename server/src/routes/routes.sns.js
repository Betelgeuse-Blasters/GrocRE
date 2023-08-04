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

export {snsRouter};
