/* eslint-disable */
import React, { useState } from 'react';
import Ingredients from './components/Ingredients';

const dummyIngredients =   {
  "ingredients": [
  [1, "cup", "all-purpose flour"],
  [2, "tablespoons", "sugar"],
  [2, "teaspoons", "baking powder"],
  [0.5, "teaspoon", "salt"],
  [2, "eggs"],
  [1, "cup", "milk"],
  [3, "tablespoons", "unsalted butter, melted"]
]}


const Meals = ({}) => {
  const [ingredients, setIngredients] = useState(dummyIngredients.ingredients);

  return(
    <>
      <Ingredients ingredients={ingredients} setIngredients={setIngredients} />
    </>
  );

}

export default Meals;