import * as model from "../models/models.sns.js";
import { validationResult } from "express-validator";


export async function getAllPosts(req, res) {
  try {
    const posts = await model.getAllPosts();
    res.status(200).send(posts)
  } catch (err) {
    res.status(550).send(err)
  }
}

export async function getPost(req, res) {
  console.log(req.query);
  try {
    const user = await model.getUser(req.query.userid);
    const meal = await model.getRecipe(req.query.mealid);
    const response = {username: user.username, meal: meal}
    res.status(202).send(response);
  } catch (err) {
    console.log('get all posts error: ', err)
    res.status(501).send(err)
  }
}