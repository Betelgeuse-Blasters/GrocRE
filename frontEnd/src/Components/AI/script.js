import { config } from "dotenv"
config()

import { Configuration, OpenAIApi } from "openai"
import readline from "readline"

const openai = new OpenAIApi(new Configuration ({
  apiKey: process.env.API_KEY
}))

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// userInterface.prompt()
// userInterface.on("line", async input => {
//   const res = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: input }],
//   })
//   console.log(res.data.choices[0].message.content)
//   userInterface.prompt()
// })

userInterface.question("What kind of meal would you like to cook? ", async (input) => {
  const prompt = `IN JSON FORMAT Please provide a real recipe name, recipe, serving size, nutrition facts, and ingredients list for a ${input}. Please correct any potential typos or misspellings.`;
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    max_tokens: 1000,
    messages:[
      {"role": "system", "content": prompt}
    ]
  });
  console.log("data----", res.data)
  console.log("Recipe:", res.data.choices[0].message.content);
  userInterface.close();
});

// import openai

// openai.ChatCompletion.create(
//   model="gpt-3.5-turbo",
//   messages=[
//         {"role": "system", "content": "You are a helpful assistant."},
//         {"role": "user", "content": "Who won the world series in 2020?"},
//         {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
//         {"role": "user", "content": "Where was it played?"}
//     ]
// )

What kind of meal would you like to cook? cheeseburger
data---- {
  id: 'chatcmpl-7hh0pSoC6DGTdaql5gxkIDE4hsq5n',
  object: 'chat.completion',
  created: 1690647799,
  model: 'gpt-3.5-turbo-0613',
  choices: [ { index: 0, message: [Object], finish_reason: 'stop' } ],
  usage: { prompt_tokens: 44, completion_tokens: 242, total_tokens: 286 }
}
Recipe: {
  "recipeName": "Classic Cheeseburger",
  "recipe": "The classic cheeseburger is an all-time favorite, combining juicy beef, melted cheese, and fresh toppings. It's perfect for any cookout or weeknight dinner.",
  "servingSize": "1 burger",
  "nutritionFacts": {
    "calories": ,
    "totalFat": ,
    "saturatedFat":,
    "cholesterol": ,
    "sodium": ,
    "carbohydrates": ,
    "fiber": ,
    "sugars": ,
    "protein":
  },
  "ingredients": [
    "1/2 pound ground beef",
    "1 hamburger bun",
    "1 slice cheese (e.g. cheddar, American, or Swiss)",
    "1 lettuce leaf",
    "1 tomato slice",
    "2 pickle slices",
    "1/4 cup diced onion",
    "1/4 cup ketchup",
    "1/4 cup mayonnaise",
    "1 teaspoon mustard",
    "Salt and pepper to taste"
  ]
}

prompt = `please give in this format: {  "recipeName": "",
"recipeDescription": ""
"recipeSteps": "",
"servingSize": "1 burger",
"nutritionFacts": {
  "calories": ,
  "totalFat": ,
  "saturatedFat": ,
  "cholesterol": ,
  "sodium": ,
  "carbohydrates": ,
  "fiber": ,
  "sugars": ,
  "protein":
},
"ingredients": [
  {
    "name"
  }

]}`