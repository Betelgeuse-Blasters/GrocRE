import express from "express";
import { body } from "express-validator";
import * as controller from "../controller/controller.sns.js";
const snsRouter = express.Router();

snsRouter.get('/posts', controller.getAllPosts)
snsRouter.get('/likes', controller.updateLikes)

export {snsRouter};
