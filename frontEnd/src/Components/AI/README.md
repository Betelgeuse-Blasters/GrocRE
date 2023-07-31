ai prompt how?


Things we need this prompt to do:

Output the Recipe, ingredients, ADD NECESSARY INGREDIENTS TO YOUR JMART CART - a link that you click to add all necessary ingredients

negative prompting for substitutes (no dairy, no eggs, no meat, etc.)

Output can look like:
{
  Ingredients:[{
    ingredient: ,
    quantity: ,
    alternative: ,
  },
  {
    ingredient: ,
    quantity: ,
  },
  {
    --- cont. ingredient array ---
  }
  ]
}

{
  Recipe: [
    '1. Preheat oven',
    '2. cry',
    '3. more steps',
    '4. yummy food good mmmm'
  ]
}

{
  nutrition: {
    calories: ,
    sodium: ,
    sugar:
  }
}

1. Force the prompt to return the info we want in the structure we want
2. Parse that data to be databasable
3. Save that info to the database
4. Serve it to frontend

{
  "recipeName": "Classic Pancakes",
  "recipeDescription": "Fluffy and delicious pancakes that are perfect for breakfast or brunch. Serve with your favorite toppings such as butter, syrup, fresh berries, or whipped cream.",
  "recipeSteps": "1. In a bowl, whisk together flour, sugar, baking powder, and salt. 2. In another bowl, beat eggs, milk, and melted butter. Combine wet and dry ingredients. 3. Heat a greased skillet over medium heat. Pour 1/4 cup of batter onto the skillet. Cook until bubbles form on top, then flip and cook until golden brown. 4. Serve with desired toppings.",
  "servingSize": "4 servings",
  "nutritionFacts": {
    "calories": 250,
    "totalFat": 8,
    "saturatedFat": 4,
    "cholesterol": 55,
    "sodium": 400,
    "carbohydrates": 36,
    "fiber": 1,
    "sugars": 6,
    "protein": 7
  },
  "ingredients": [
    [1, "cup", "all-purpose flour"],
    [2, "tablespoons", "sugar"],
    [2, "teaspoons", "baking powder"],
    [0.5, "teaspoon", "salt"],
    [2, "eggs"],
    [1, "cup", "milk"],
    [3, "tablespoons", "unsalted butter, melted"]
  ]
}
 what do you guys think of this structure for us to expect from gpt?
here is the prompt: Please provide a recipe and give it in the following and please give in this format:
{ "recipeName": "",
"recipeDescription": ""
"recipeSteps": "",
"servingSize": "",
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

     [number, "measurement", "ingredient"]

]}