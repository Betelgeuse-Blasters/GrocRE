/* eslint-disable */
import { RollbackOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Collapse, Input, Button } from 'antd';

// Components
import Ingredients from './Ingredients';
import Steps from './Steps';

const Recipe = ({recipe}) => {
  // console.log('passed in recipe', recipe);

  return (
    <>
      <Input defaultValue={recipe.recipeName} />
      <br />
      <p>Description:</p>
      <Input defaultValue={recipe.recipeDescription} />
      <br />
      <Ingredients ingredients={recipe.ingredients} />
      <Steps steps={recipe.recipeSteps} />
      <br/>
      <br/>
      <br/>
      <br/>
    </>
  );
}

const Recipes = ({recipes, setRecipes}) => {

  return (
    <>
      {
        recipes.map((recipe) => <Recipe recipe={recipe} />)
      }
    </>
  );
}

export default Recipes;