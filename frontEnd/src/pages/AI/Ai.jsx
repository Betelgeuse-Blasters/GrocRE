import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { Input, Button } from 'antd';
import anime from 'animejs/lib/anime.es.js';
import '../../styles/Ai.css';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import NutritionFacts from './NutritionFacts';
import Game from './Game';
import UserContext from '../../Context/User.js'
export default function Ai() {
const API_URL = import.meta.env.VITE_API_URL;
  const [user] = useContext(UserContext)
  const audioRef = useRef(new Audio('/meatTheme.mp3'))
  audioRef.current.loop = true;
  const [meal, setMeal] = useState('');
  const [mealID, setMealID] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const meatballLoadRef = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [started, setStarted] = useState(false)
  const [meatballSize, setMeatballSize] = useState(1)
  const meatballSizeRef = useRef(meatballSize);
  const audioTimeRef = useRef(0);

  const handleSaveRecipe = async () => {
    try {
      await axios.post(`${API_URL}/ai/likeRecipe`, { recipeId: mealID, userId: user.id});
      // Handle success - e.g., show a success message or update state
    } catch (err) {
      console.log('ERROR HANDLING SAVE RECIPE')
    }
  };

  const handleUnsaveRecipe = async () => {
    try {
      await axios.post(`${API_URL}/ai/unlikeRecipe`, { recipeId: mealID, userId: user.id});
      console.log('UNSAVED FROM RECIPE')

    } catch (err) {
      console.log('ERROR HANDLING SAVE RECIPE')
    }
  };

  const handleStarHover = () => {
    setIsHover(true);
  };

  const handleLeaveHover = () => {
    setIsHover(false);
  };

  const handleStarClick = () => {
    setIsFilled(!isFilled);
    if(!isFilled) {
      handleSaveRecipe();
    } else {
      handleUnsaveRecipe();
    }

  }

  // useEffect(() => {


  //   if (isFilled) {

  //     handleSaveRecipe();


  //   } else {
  //     // delete from favorites database
  //     handleUnsaveRecipe();

  //   }
  // }, [isFilled]);

  const prompts = [
    'Mountain Dew Based Meal', 'A Kiel meal', 'Potato salad from Spongebob', 'The meatball man is coming', 'Have you looked at your bank account lately?', 'vegan kosher hotdog'
  ];

  const [promptIdeas, setPromptIdeas] = useState(prompts[0]);
  const [promptIndex, setPromptIndex] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setPromptIdeas(prompts[promptIndex]);

      if (promptIndex === prompts.length - 1) {
        setPromptIndex(0);
      } else {
        var num = promptIndex;
        setPromptIndex(num + 1);
      }
    }, 8000);

    return () => clearInterval(timer);
  }, [promptIndex]);

  useEffect(() => {
    meatballSizeRef.current = meatballSize;
    let animation;
    if (loading) {
    const startingSize = meatballSizeRef.current;
    const remainingDuration = 80000

    animation = anime({
      targets: meatballLoadRef.current,
      scale: [startingSize, 50],
      easing: 'linear',
      duration: remainingDuration,
      update: (anim) => {
        const newSize = startingSize + (49 - startingSize) * anim.progress / 100;
        meatballSizeRef.current = newSize;
        setMeatballSize(newSize);
        console.log('MEATBALL SIZE', meatballSizeRef.current)
      },
    })
  }
  return () => {
    if(animation) {
    animation.pause();
    }
  };
  }, [loading]);
//meatball man theme useEffect which pauses when loading stops
useEffect(() => {
  if (!loading) {
    audioTimeRef.current = audioRef.current.currentTime; // store the current time position
    audioRef.current.pause(); // pause the audio when loading is complete
  }else {
    audioRef.current.currentTime = audioTimeRef.current; // resume from the last position
    audioRef.current.play();
  }

}, [loading]);

  const handleSearch = async () => {

    try {
      if  (inputValue === '') {
        alert('put a meal in why dontcha')
        return
      }
      setLoading(true);
      setStarted(true);
      // setTimeout(() => {
      //   setLoading(false);
      // }, 10000);
      const response = await axios.post('http://localhost:3000/ai/getRecipe', {
        meal: inputValue,
        creatorId: user.id,
      });
      console.log('can i get uhhhhhhhh', response.data.recipe);
      setMeal(response.data.recipe);
      setMealID(response.data.mealID)
    } catch (error) {
      console.error("An error occurred while fetching the recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value)
  };

  const fractionFactory = (decimal) => {
    if (decimal % 1 === 0 || Math.floor(decimal) === isNaN) {
      return decimal;
    }

    const gcd = (a, b) => {
      a = parseFloat(a);
      b = parseFloat(b);
      if (isNaN(a) || isNaN(b)) {
        console.warn('Both a and b must be numeric values.');
        return null;
      }
      if (a === 0) {
        return b;
      } else if (b === 0) {
        return a;
      } else if (a < b) {
        return gcd(a, b % a);
      } else {
        return gcd(b, a % b);
      }
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
      <h1 className='text-6xl font-cairo flex justify-center'>Let's Get Cookin'!</h1>
      <div className="flex justify-center mt-5 mb-5">
        <h3 className='text-2xl w-2/3 text-center'>Get ready to level up your culinary game with GrocRE's cutting-edge AI! Just toss in your wildest recipe idea or the ingredients you've got in your kitchen, and watch the magic happen - voilà!</h3>
      </div>
      <div className='flex flex-row justify-center mb-5 space-x-4'>
        <Input
          placeholder="Can I get uhhhhhhhh..." value={inputValue} onChange={handleInput}
          className='w-1/2 text-2xl'
        ></Input>
        <Button onClick={handleSearch} className='text-xl h-fit w-fit'>Submit</Button>
      </div>
      {loading ? <div className='flex justify-center' ref={meatballLoadRef}>
        <img src='/meatball.png' className='w-10 h-10' />
      </div> : null}
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
          <Game started={started} setStarted={setStarted}/>
        </div>
      )}
    </div>
  );
}