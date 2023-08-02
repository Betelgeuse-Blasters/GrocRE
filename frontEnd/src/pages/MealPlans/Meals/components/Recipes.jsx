/* eslint-disable */
import { RollbackOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Collapse, Input, Button } from 'antd';

import Ingredients from './Ingredients';
import Steps from './Steps';

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

const Recipe = ({recipe}) => {


  return (
    <>
      <Input defaultValue={recipe.recipeName} />
      <br />
      <p>Description:</p>
      <Input defaultValue={recipe.recipeDescription} />
      <br />
      <Ingredients ingredients={recipe.ingredients} />
      <Steps steps={recipe.recipeSteps} />
    </>
  );
}

const Recipes = ({recipes, setRecipes}) => {
  const [editing, setEditing] = useState(false);
  const [changes, setChanges] = useState(recipes);
  recipes = [dummyRecipe];

  return (
    <>
      {
        recipes.map((recipe) => <Recipe recipe={recipe} />)
      }
    </>
  );

  // const editActions = () => {
  //   return (
  //     <>
  //       {
  //         editing ?
  //         <>
  //           <RollbackOutlined onClick={(e) => { e.stopPropagation(); }} style={{'marginRight': '1rem'}} />
  //           <CheckOutlined onClick={(e) => { e.stopPropagation(); setEditing(false); }} />
  //         </>
  //         : <EditOutlined onClick={(e) => {e.stopPropagation(); setEditing(true)}}/>
  //       }
  //     </>
  //   )
  // }

  // const items = {
  //   key: 'recipes',
  //   label: 'Recipes',
  //   children: recipes.map(recipe => <Input defaultValue={recipe}/>),
  //   extra: editActions()
  // };

  // const recordActions = () => {
  //   return (
  //     <div className='flex justify-between my-[1rem]'>
  //       <Button>Delete</Button>
  //       <Button style={{color: 'white', backgroundColor: '#1677ff'}}>Add New</Button>
  //     </div>
  //   );
  // }
  // items.children.push(recordActions());

  // return (
  //   <>

  //     <Collapse
  //       defaultActiveKey={['1']}
  //       items={[items]}
  //     />
  //   </>
  // );

}

export default Recipes;