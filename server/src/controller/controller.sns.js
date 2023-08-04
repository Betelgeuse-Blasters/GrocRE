import * as model from "../models/models.sns.js";
import { validationResult } from "express-validator";


export async function getAllPosts(req, res) {
  try {
    const posts = await model.getAllPosts();
    for (let i = 0; i < posts.length; i++) {
      const user = await model.getUser(posts[i].userId)
      posts[i].username = user.nickname;
      const meal = await model.getRecipe(posts[i].mealId)
      posts[i].meal = meal;
    }
    res.status(200).send(posts)
  } catch (err) {
    console.log('get posts error: ', err)
    res.status(550).send(err)
  }
}

export async function updateLikes(req, res) {
  try {
    let test = await model.updateLikes(req.query.postid, req.query.userid, req.query.like)
    res.sendStatus(201);
  } catch (err) {
    console.log('update likes error: ', err)
    res.status(500).send(err)
  }
}

export async function getLikes(req, res) {
  try {
    const likes = await model.getLikes(req.query.postid, true)
    const dislikes = await model.getLikes(req.query.postid, false)
    const response = {likes: likes, dislikes: dislikes}
    res.send(response);
  } catch (err) {
    console.log('get likes error: ', err)
    res.status(500).send(err)
  }
}

export async function saveRecipe(req, res) {
  try {
    await model.saveRecipe(req.query.userid, req.query.recipeid);
    res.sendStatus(201)
  } catch (err) {
    console.log('saving recipe error: ', err)
  }
}

export async function unsaveRecipe(req, res) {
  try {
    await model.unsaveRecipe(req.query.userid, req.query.recipeid)
    res.sendStatus(201)
  } catch (err) {
    console.log('Unsaving recipe error: ', err)
    res.sendStatus(501)
  }
}

export async function getSavedRecipe(req, res) {
  try {
    const saved = await model.getSavedRecipe(req.query.userid, req.query.recipeid)
    res.send(saved)
  } catch (err) {
    console.log('error getting recipe: ', err)
    res.sendStatus(501);
  }
}