/* eslint-disable */
import React from 'react';

// Components
import Recipes from './components/Recipes.jsx';

const Meal = ({meal}) => {

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

export default Meal;