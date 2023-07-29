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