/* eslint-disable */
import { RollbackOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Collapse, Input, Button } from 'antd';

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
  const [editing, setEditing] = useState(false);
  const [changes, setChanges] = useState(recipes);

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