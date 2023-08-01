import * as model from "../models/models.ai.js";
import { validationResult } from "express-validator";
import { Configuration, OpenAIApi } from "openai";
import { config } from "dotenv";
config();

//this function just does the math and replaces any fractions
  //sanitizing data for slashes
  const sanitizeContent = (content) => {
      const fraction = /\b(\d+)\/(\d+)\b/g;
    return content.replace(fraction, (match, numerator, denominator) => {
        return numerator / denominator
  })
}
export const getRecipe = async (req, res) => {
  try {
    const input = req.body.meal;
    const openai = new OpenAIApi(
      new Configuration({
        apiKey: process.env.API_KEY,
      })
    );

  const prompt = `Provide a meal recipe that best fits this prompt: "${input}" give it this JSON format with all measure numbers in decimal format, do not use any '/', no fractions allowed:
 
  { "recipeName": "",
  "recipeDescription": "",
  "recipeSteps": [["1. ..."] ...],
  "servingSize": number,
  "nutritionFacts": {
    "calories": number,
    "totalFat": number,
    "saturatedFat": number,
    "cholesterol": number,
    "sodium": number,
    "carbohydrates": number,
    "fiber": number,
    "sugars": number,
    "protein": number
  },
  "ingredients": [

       ["number(0.0)", "measurement", "ingredient"]

  ]}`;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    max_tokens: 1000,
    messages: [
      { "role": "system", "content": prompt }
    ]
  });


  console.log(response.data.choices[0].message.content)
  const content = response.data.choices[0].message.content;
  const sanitized = sanitizeContent(content);
  console.log("SANITIZED CONTENT",sanitized)
  const recipeData = JSON.parse(sanitized);

    // console.log(prompt)
    // const response = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   max_tokens: 1000,
    //   messages: [
    //     { "role": "system", "content": prompt }
    //   ]
    // });
    //parse the recipe received from OpenAI

    /* USER NEEDS TO BE CHANGED TO GUY WHO ACTUALLY REACTED IT LATER!!!!!!!!!!____!_!_!__!_!_!_!__!_!_!__!__!_!_!__!_!_!_!__!*/

  const saveRecipe = await model.saveRecipe(recipeData);
  console.log(response.data);
  res.json({recipe:recipeData});
  } catch (err) {
    console.log("all hail the meatball man", err);
    res.status(500).send(err);
  }
};


export const getRecipe2 = async (req, res) => {
}
// }
// let prompt = `Please provide a meal recipe that best fits this prompt: ${input}. Please give in this format:
// { "recipeName": "",
// "recipeDescription": ""
// "recipeSteps": "1. ... \n",
// "servingSize": "",
// "nutritionFacts": {
//   "calories": ,
//   "totalFat": ,
//   "saturatedFat": ,
//   "cholesterol": ,
//   "sodium": ,
//   "carbohydrates": ,
//   "fiber": ,
//   "sugars": ,
//   "protein":
// },
// "ingredients": [

//      ["number", "measurement", "ingredient"]

// ]}`

/* EXAMPLE DATA
{
  "recipeName": "Mountain Dew Citrus Chicken",
  "recipeDescription": "A delightful and tangy chicken dish that features the unexpected twist of Mountain Dew. The soda's citrus flavor pairs surprisingly well with the chicken, offering a unique taste experience.",
  "recipeSteps": "1. In a bowl, mix Mountain Dew, soy sauce, garlic, ginger, and brown sugar to create the marinade. \n2. Add the chicken to the marinade and refrigerate for at least 1 hour. \n3. Preheat oven to 375°F (190°C). \n4. Remove chicken from marinade, saving the liquid. Place chicken in a baking dish. \n5. In a saucepan, reduce the marinade by half over medium heat. Pour over chicken. \n6. Bake for 25-30 minutes, basting occasionally, until chicken is cooked through. \n7. Garnish with sesame seeds and sliced green onions. Serve with rice or noodles.",
  "servingSize": "4 servings",
  "nutritionFacts": {
    "calories": 420,
    "totalFat": 9,
    "saturatedFat": 2,
    "cholesterol": 85,
    "sodium": 710,
    "carbohydrates": 46,
    "fiber": 0,
    "sugars": 38,
    "protein": 34
  },
  "ingredients": [
    [1, "cup", "Mountain Dew"],
    [0.25, "cup", "soy sauce"],
    [2, "cloves", "garlic, minced"],
    [1, "teaspoon", "ground ginger"],
    [0.25, "cup", "brown sugar"],
    [4, "pieces", "chicken breasts"],
    [1, "tablespoon", "sesame seeds"],
    [2, "stalks", "green onions, sliced"]
  ]
}
*/
