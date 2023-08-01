import * as model from "../models/models.ai.js";
import { validationResult } from "express-validator";
import { Configuration, OpenAIApi } from "openai";
import { config } from "dotenv"
config()

export const getRecipe = async (req, res) => {
  const input = req.body.meal;
  const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.API_KEY
  }));

  const prompt = `Please provide a real recipe name, recipe, serving size, nutrition facts, and ingredients list for a ${input}. Please correct any potential typos or misspellings.`;
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    max_tokens: 1000,
    messages: [
      { "role": "system", "content": prompt }
    ]
  });

  res.json({ recipe: response.data.choices[0].message.content });
};

export const getRecipe2 = async (req, res) => {



}
