/* eslint-disable */
import React from 'react';
import Recipes from './Recipes'




const UserMeal = ({meal}) => {
console.log(meal);
  return (
    <>
     <h2>{meal.name}</h2>
     <p>{meal.description}</p>
     
    </>
  );
}


export default UserMeal;