/* eslint-disable */
import React from 'react';
import Recipes from './Recipes'




const UserMeal = ({meal}) => {

  return (
    <>
     <h2>{meal.name}</h2>
     <p>{meal.description}</p>
     <Recipes recipe={meal.recipes} />
    </>
  );
}


export default UserMeal;