/* eslint-disable */
import React from 'react';
import Recipes from '../Meals/components/Recipes.jsx';

let MealPlan2 = ({meal}) => {
    
    if(meal){
    
    return (
        <>
        <h1 className='font-bold'>{meal.name}</h1>
        <hr/>
        <h3 className='font-light mb-[1rem]'>{meal.description}</h3>
        {
            meal.recipes && 
            <Recipes recipes={meal.recipes}/>
        }
        </>
    );
    }else{
        return (<></>);
    }
};

export default MealPlan2;