import * as model from "../models/models.meal.js";
import { validationResult } from "express-validator";
import { Configuration, OpenAIApi } from "openai";
import { config } from "dotenv";
config();


export const getRecipe = async (req, res) => {
  const mealID = req.query.mealID
  console.log('MEAL ID', mealID)
  try {
    const recipe = await model.getRecipebyID(mealID);
    // console.log('RECIPE CONTROLLER++++++', recipe)
    res.json(recipe);
  } catch(err){
    console.log('RECIPE CONTROLLER ERROOR ------', err)
    res.status(500).send('RECIPE CONTROLLER ERRROR')
  }

};