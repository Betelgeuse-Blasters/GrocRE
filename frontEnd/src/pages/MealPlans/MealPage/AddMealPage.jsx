/* eslint-disable */
import React, { useState, useEffect } from 'react';

// helpers
import Api from '../api.js';
import API from '../../../Helper/API.js';
import * as random from '../../../Helper/RandomPhotos.js';

export const AddMealPage = ({ mealPlanId, setChanged }) => {
  const [meals, setMeals] = React.useState([]);

  // get all meals available
  useEffect(() => {
    let api = new Api('/meals');
    api.get().then((data) => {
      setMeals(data);
    });
  }, []);


  // add meal to plan
  const addMeal = (mealPlanId, mealId) => {
    API.PUT_MEALPLANS(mealPlanId, mealId)
      .then((response) => setChanged(true))
      .catch((err) => console.log('err', err))
  };


  const imageContainerStyle = {
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "200px",
    height: "200px"
  }

  return (
    <div className="">
      <div className="text-center">
        <p> <strong>Oh No!</strong> You Don't Have Any Meals </p>
        <p> Select from one of our Scrumtilliumptious&copy; meals to add to your plan </p>
      </div>
      <div className="flex justify-center max-h-[50%]">
        <div className="max-h-full text-center w-1/2">
          {
            meals.map((meal) =>
              <div key={meal.id} className='border-2 flex justify-center items-center justify-evenly my-5 p-5 bg-white/50'>
                <div style={{ ...imageContainerStyle, ...{ backgroundImage: `url("${random.RandomPhoto()}")` } }}></div>
                <div>
                  <p className="text-2xl font-semibold">{meal.recipeName}</p>
                  <p className="text-lg">{meal.recipeDescription}</p>
                </div>
                <button className='w-[10%] border rounded p-3 bg-gradient-to-r from-[#008080]/50 via-teal-300 to-[#008080]/50 font-semibold hover:font-bold hover:border-2 hover:border-black/50' onClick={() => addMeal(mealPlanId, meal.id)}>Add Meal</button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );

};