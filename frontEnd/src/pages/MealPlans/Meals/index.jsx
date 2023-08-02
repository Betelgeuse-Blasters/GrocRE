/* eslint-disable */
import React, { useState } from 'react';
import UserMeal from './components/UserMeal';

const dummyRecipe = {
  "recipeName": "Delicious Pancakes",
  "recipeDescription": "A simple and tasty pancake recipe",
  "recipeSteps": ["Step 1: Mix the dry ingredients", "Step 2: Add wet ingredients and mix well", "Step 3: Cook the pancakes on a hot griddle"],
  "servingSize": 4,
  "nutritionFacts": { "calories": 250, "carbs": 30, "protein": 5, "fat": 12 },
  "ingredients": [
    [1, "cup", "all-purpose flour"],
    [2, "tablespoons", "sugar"],
    [2, "teaspoons", "baking powder"],
    [0.5, "teaspoon", "salt"],
    [2, "eggs"],
    [1, "cup", "milk"],
    [3, "tablespoons", "unsalted butter, melted"]
  ],
  "creatorId": 1
}

const dummyMeal = {
  "name": "Weekend Brunch",
  "description": "A delicious meal plan for a relaxing weekend brunch",
  "userId": 1,
  "recipes": [dummyRecipe]
}

const Meals = ({meals}) => {
  meals = [dummyMeal];

  return(
    <>
      {
        meals.map(meal => <UserMeal meal={meal} />)
      }
    </>
  );

}

export default Meals;