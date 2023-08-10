import * as model from "../models/models.sns.js";
import { validationResult } from "express-validator";


export async function getAllPosts(req, res) {
  if(!req.userInfo.loggedIn) {
    return res.sendStatus(400).json("Unable to complete request, Please log in")
  }
  try {
    const posts = await model.getAllPosts(req.query.count);
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
  if(!req.userInfo.loggedIn) {
    return res.sendStatus(400).json("Unable to complete request, Please log in")
  }
  try {
    const test = await model.updateLikes(req.query.postid, req.userInfo.id, req.query.like)
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
  if(!req.userInfo.loggedIn) {
    return res.sendStatus(400).json("Unable to complete request, Please log in")
  }
  try {
    await model.saveRecipe(req.userInfo.id, req.query.recipeid);
    res.sendStatus(201)
  } catch (err) {
    console.log('saving recipe error: ', err)
  }
}

export async function unsaveRecipe(req, res) {
  if(!req.userInfo.loggedIn) {
    return res.sendStatus(400).json("Unable to complete request, Please log in")
  }
  try {
    console.log(req.userInfo.id)
    await model.unsaveRecipe(req.userInfo.id, req.query.recipeid)
    res.sendStatus(201)
  } catch (err) {
    console.log('Unsaving recipe error: ', err)
    res.sendStatus(501)
  }
}

export async function getSavedRecipe(req, res) {
  if(!req.userInfo.loggedIn) {
    return res.sendStatus(400).json("Unable to complete request, Please log in")
  }
  try {
    const saved = await model.getSavedRecipe(req.userInfo.id, req.query.recipeid)
    res.send(saved)
  } catch (err) {
    console.log('error getting recipe: ', err)
    res.sendStatus(501);
  }
}

export async function getMeals(req, res) {
  if(!req.userInfo.loggedIn) {
    return res.sendStatus(400).json("Unable to complete request, Please log in")
  }
  try {
    console.log(req.userInfo.id)
    const meals = await model.getMeals(req.userInfo.id);
    res.send(meals)
  } catch (err) {
    console.log('error getting saved meals: ', err);
    res.sendStatus(501);
  }
}

export async function getMealPlans(req, res) {
  if(!req.userInfo.loggedIn) {
    return res.sendStatus(400).json("Unable to complete request, Please log in")
  }
  try {
    const mealplans = await model.getMealPlans(req.userInfo.id);
    res.send(mealplans)
  } catch (err) {
    console.log('error getting saved meals: ', err);
    res.sendStatus(501);
  }
}



export async function postMeal(req,res) {
  if(!req.userInfo.loggedIn) {
    return res.sendStatus(400).json("Unable to complete request, Please log in")
  }
  try {
    // const post = req.body
    const userid = req.userInfo.id
    const post = await model.postMeal(userid,req.body)
    console.log(post)
  } catch (err) {
    console.log('error posting meal: ', err);
    res.sendStatus(501);
  }
}