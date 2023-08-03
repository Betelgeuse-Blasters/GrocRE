
/**
 *
 {
    "id": 2,
    "name": "Meal Plan 2",
    "description": "Aspernatur itaque repudiandae quo alias ut reprehenderit.",
    "userId": 1,
    "recipes": [
        {
            "id": 1,
            "recipeName": "dolorem possimus necessitatibus",
            "recipeDescription": "Vero deleniti molestias dolore consectetur sit alias eaque quod voluptatem.",
            "recipeSteps": [
                "1. Maxime adipisci optio quo quia.",
                "2. Dolorem veniam fugiat.",
                "3. Harum laboriosam dignissimos illo officiis."
            ],
            "servingSize": 2,
            "nutritionFacts": {
                "fiber": 9,
                "sodium": 235,
                "sugars": 11,
                "protein": 5,
                "calories": 210,
                "totalFat": 26,
                "cholesterol": 61,
                "saturatedFat": 11,
                "carbohydrates": 76
            },
            "ingredients": [
                [
                    "5.0",
                    "cup",
                    "Keyboard"
                ],
                [
                    "4.0",
                    "tbsp",
                    "Mouse"
                ],
                [
                    "4.0",
                    "tsp",
                    "Chair"
                ]
            ],
            "creatorId": null
        },
        {
            "id": 6,
            "recipeName": "aliquid error quaerat",
            "recipeDescription": "Minus cum fuga velit esse sint laborum repellendus enim.",
            "recipeSteps": [
                "1. Dolores vero saepe beatae doloremque aperiam adipisci voluptates voluptas.",
                "2. Itaque facere assumenda impedit vitae optio.",
                "3. Eum quasi corporis cupiditate commodi accusantium eligendi expedita amet."
            ],
            "servingSize": 4,
            "nutritionFacts": {
                "fiber": 2,
                "sodium": 244,
                "sugars": 13,
                "protein": 5,
                "calories": 195,
                "totalFat": 18,
                "cholesterol": 43,
                "saturatedFat": 11,
                "carbohydrates": 100
            },
            "ingredients": [
                [
                    "1.0",
                    "cup",
                    "Bacon"
                ],
                [
                    "1.0",
                    "tbsp",
                    "Shirt"
                ],
                [
                    "5.0",
                    "tsp",
                    "Keyboard"
                ]
            ],
            "creatorId": null
        },
        {
            "id": 7,
            "recipeName": "dignissimos nam maxime",
            "recipeDescription": "Consequuntur tempora error.",
            "recipeSteps": [
                "1. Accusantium optio reprehenderit.",
                "2. Iure illum iusto nihil rerum consectetur.",
                "3. Maxime esse totam magni sunt ratione."
            ],
            "servingSize": 3,
            "nutritionFacts": {
                "fiber": 5,
                "sodium": 493,
                "sugars": 16,
                "protein": 39,
                "calories": 399,
                "totalFat": 24,
                "cholesterol": 81,
                "saturatedFat": 11,
                "carbohydrates": 64
            },
            "ingredients": [
                [
                    "5.0",
                    "cup",
                    "Salad"
                ],
                [
                    "1.0",
                    "tbsp",
                    "Chicken"
                ],
                [
                    "5.0",
                    "tsp",
                    "Car"
                ]
            ],
            "creatorId": null
        }
    ]
}
 */


export const getMealPlanIngredients = (mealPlan) => {
  if (!mealPlan || !Array.isArray(mealPlan.recipes)) return [];
  let ingredients = [];
  console.log('mealPlan', mealPlan);
  mealPlan.recipes.forEach((recipe) => {
    ingredients.push(...recipe.ingredients);
  });

  return ingredients;
}

export const getMealPlansIngredients = (mealPlans) => {
  if (!mealPlans || !Array.isArray(mealPlans)) return [];
  let ingredients = [];

  mealPlans.forEach((mealPlan) => {
    ingredients.push(...getMealPlanIngredients(mealPlan));
  });
};



export const getMealPlan = (mealPlans, id) => {
  if (!mealPlans || !Array.isArray(mealPlans)) return {};
  return mealPlans.find((mealPlan) => mealPlan.id == id);
};

export const getMenuItems = (mealPlans) => {
  let results = [];
  if (!mealPlans || !Array.isArray(mealPlans)) return results;

  mealPlans.forEach((mealPlan) => {
    results.push({ key: mealPlan.id, label: mealPlan.name});
  });

  return results;
}

