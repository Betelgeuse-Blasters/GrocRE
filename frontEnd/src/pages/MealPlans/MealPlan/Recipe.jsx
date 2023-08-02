import React from 'react';
let Recipe = ({recipe}) => {
    return (
        <>
            <h1>{recipe.recipeName}</h1>
            <hr/>
            <h5>{recipe.recipeDescription}</h5>
        </>
    )
};
export default Recipe;