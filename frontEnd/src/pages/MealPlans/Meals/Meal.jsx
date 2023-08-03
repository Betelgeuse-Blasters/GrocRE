/* eslint-disable */
import React from 'react';

// Components
import Recipes from './components/Recipes.jsx';
import IngredientsModal from './modals/IngredientsModal.jsx';

const Meal = ({mealPlan}) => {

    if(mealPlan){

    return (
        <>
        <h1 className='font-bold'>{mealPlan.name}</h1>
        <IngredientsModal mealPlan={mealPlan}/>
        <hr/>
        <h3 className='font-light mb-[1rem]'>{mealPlan.description}</h3>
        {
            mealPlan.recipes &&
            <Recipes recipes={mealPlan.recipes}/>
        }
        </>
    );
    }else{
        return (<></>);
    }
};

export default Meal;