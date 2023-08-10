import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Select, message } from 'antd';
import '../../styles/Ai.css';
import { StarOutlined, StarFilled, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import NutritionFacts from '../AI/NutritionFacts.jsx';
import { useParams } from "react-router-dom";
import API from '../../Helper/API.js';


export default function Meal() {
  const {mealID}= useParams();

  const [meal, setMeal] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const meatballLoadRef = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    // Define the URL for the API call

    // Make the rrrrrrrrrrrrrrrrrrrrrrrrrrr GET request
    API.GET_MEAL(mealID)
    .then((response) => {
      setMeal(response.data);
    })
    .catch((error) => {
      console.error("An error occurred while fetching the recipe:", error);
    });
  }, []);

  const handleStarHover = () => {
    setIsHover(true);
  };

  const handleLeaveHover = () => {
    setIsHover(false);
  };

  const handleStarClick = () => {
    setIsFilled(!isFilled);
  }
  //useEffect get meal from db with mealID
  useEffect(() => {
    if (isFilled) {
      // add to database favorites
    } else {
      // delete from favorites database
    }
  }, [isFilled]);

  const prompts = [
    'Mountain Dew Based Meal', 'A Kiel meal', 'Potato salad from Spongebob', 'The meatball man is coming', 'Have you looked at your bank account lately?', 'vegan kosher hotdog'
  ];

  const [promptIdeas, setPromptIdeas] = useState(prompts[0]);
  const [promptIndex, setPromptIndex] = useState(1);
  const [addToMealPlan, setAddToMealPlan] = useState(false);
  const [selectedMeal, setSelectedMeal] = React.useState({});
  const [myMealPlans, setMyMealPlans] = useState([]);


  const handleInput = (e) => {
    setInputValue(e.target.value)
  };

  const getUserMeals = async () => {
    try {
      const response = await API.GET_MEALPLANS();
      return response.data;
    } catch (error) {
      console.error('Error fetching meal plans:', error);
      return [];
    }
  };

  const addMealToMealPlan = () => {
    API.PUT_MEALPLANS(selectedMeal.id, meal.id).then((response) => {
      setAddToMealPlan(false);
      message.success(`This meal has been added to your '${selectedMeal.name}' Meal Plan`, 2);
    }).catch((error) => {
      setAddToMealPlan(false);
    });
  };
  useEffect(() => {
    //set user meal plans
    const pullMeals = getUserMeals();
    pullMeals.then((response) => {
        console.log(response);
        let me = {};
        me['plans'] = {};
        me['menu'] = [];
        let defaulted = false;
        response.map((e) => {
          me['plans'][e.id] = e;
          me['menu'].push({label:e.name, value:e.id});
          if(!defaulted){
            console.log(e);
            setSelectedMeal(e);
            defaulted = true;
          }
        });
        setMyMealPlans(me);

    }).catch((error) => {
      console.log(error);

    });
  }, []);

  const mealPlans = () => {
    if(Object.keys(myMealPlans).length > 0){
    return(
      <>
        <Select
        style={{ width: 120 }}
        defaultValue={myMealPlans.menu[0]}
        onChange={(e) => setSelectedMeal(myMealPlans.plans[e])}
        options={myMealPlans.menu}
        />

        <CheckOutlined className="self-center pl-5 text-3xl" onClick={() => addMealToMealPlan()}/>
        <CloseOutlined className="self-center pl-5 text-3xl" onClick={() => setAddToMealPlan(false)}/>
      </>);
    }else{
      setAddToMealPlan(false);
      alert('No meal plans currently. Please make a meal plan.');
    }
  }


  const fractionFactory = (decimal) => {
    if (decimal % 1 === 0 || Math.floor(decimal) === isNaN) {
      return decimal;
    }

    const gcd = (a, b) => {
    // Check if a and b are positive integers
    if (a <= 0 || b < 0 || !Number.isInteger(a) || !Number.isInteger(b)) {
    console.error("Invalid inputs:", a, b);
    return 1;
  }
      if (b === 0) return a;
      return gcd(b, a % b);
    };



    let letVal = Math.floor(decimal);
    let fVal = decimal - letVal;
    let pVal = 1000000000;
    let gcdVal = gcd(Math.round(fVal * pVal), pVal);
    let num = Math.round(fVal * pVal) / gcdVal;
    let deno = pVal / gcdVal;

    if (num > deno) {
      let mixedVal = Math.floor(num / deno);
      num = num % deno;
      return `${letVal ? `${letVal} ` : ''}${mixedVal} ${num}/${deno}`;
    } else {
      return `${letVal ? `${letVal} ` : ''}${num}/${deno}`;
    }
  };

  return (
    <div className='pb-5'>
      {meal ? (
        <div className=''>
          <div className='flex flex-row justify-center relative mb-5'>
            <div className='text-5xl font-medium'>{meal.recipeName}</div>
            <div
              onMouseEnter={handleStarHover}
              onMouseLeave={handleLeaveHover}
              onClick={handleStarClick}
            >
              {isHover || isFilled ? (
                <StarFilled className="self-center pl-5 text-3xl text-[#fcd34d]" />
              ) : (
                <StarOutlined className="self-center pl-5 text-3xl text-[#fcd34d]" />
              )}
              {
                addToMealPlan ? mealPlans() : <PlusOutlined className="self-center pl-5 text-3xl" onClick={() => setAddToMealPlan(true)}/>
              }
            </div>
          </div>
          <hr className='mt-4 mb-5 mx-auto w-2/3'></hr>
          <div className='w-2/3 mx-auto rounded-md p-8 bg-[#FFFFFF]/70'>
            <div className='flex flex-row ml-5'>
              <div className='flex flex-col w-1/3 relative shadow-xl rounded mr-16 ml-5'>
                <img
                  src="https://bolt-gcdn.sc-cdn.net/3/iAgMd936GPdlxahIYCPlt?bo=EhgaABoAMgF9OgEEQgYI_bOh9AVIAlASYAE%3D&uc=18"
                  className='w-fit self-center'
                />
                <div className='mt-5 flex flex-col'>
                  <NutritionFacts meal={meal} />
                  {/* <h1 className='text-2xl font-medium text-center'> Serving Size: {meal.servingSize}</h1>
                  <h1 className='text-2xl font-medium ml-3'>Nutrition: </h1>
                  <ol className='text-lg ml-3'>
                    <li>Calories: {meal.nutritionFacts.calories} kCal</li>
                    <li>Total Fat: {meal.nutritionFacts.totalFat} g</li>
                    <li>Saturated Fat: {meal.nutritionFacts.saturatedFat} g</li>
                    <li>Cholesterol: {meal.nutritionFacts.cholesterol} mg</li>
                    <li>Sodium: {meal.nutritionFacts.sodium} mg</li>
                    <li>Carbohydrates: {meal.nutritionFacts.carbohydrates} g</li>
                    <li>Fiber: {meal.nutritionFacts.fiber} g</li>
                    <li>Sugars: {meal.nutritionFacts.sugars} g</li>
                    <li>Protein: {meal.nutritionFacts.protein} g</li>
                  </ol> */}
                  <h2 className='text-sm font-medium mb-3 mr-3 ml-3 text-center italic'>Disclaimer: The recipes generated by GrocRE are solely provided for informational purposes and convenience. We do not take responsibility for any outcomes or consequences resulting from the use of these AI-generated recipes. Users are advised to exercise caution, verify ingredients, and use their best judgment when preparing dishes.</h2>
                </div>
              </div>
              <div className='flex flex-col w-2/3 mr-5 ml-5'>
                <div className=''>
                  <h2 className='text-2xl flex justify-center text-center'>{meal.recipeDescription}</h2>
                </div>
                <div className='border-2 border-gray-400/50 mt-5'>
                  <h1 className='text-4xl font-medium text-center mb-3'>ingredients: </h1>
                  <ul className='text-xl ml-5 mb-5'>
                    {meal.ingredients.map((item, index) => (
                      <li className='list-disc ml-5 mb-3' key={index}>{fractionFactory(item[0])} {item[1]} {item[2]}</li>
                    ))}
                  </ul>
                </div>
                <div className='mt-5'>
                  <h1 className='text-4xl font-medium text-center'>directions: </h1>
                  <ul className='text-xl'>
                    {meal.recipeSteps.map((item, index) => (
                      <li className='mb-3' key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className='flex justify-center text-2xl'>
            <strong className='mr-5 w-1/4 text-end'>Try: </strong>
            <div className='w-3/4 text-start'>
              <span key={promptIndex} style={{ animation: 'fadeInOut 8s infinite' }}> {promptIdeas}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// style={{marginLeft: position}}