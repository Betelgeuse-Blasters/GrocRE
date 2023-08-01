import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import NavBar from "../../NavBar";
import { Input, Button, Rate } from 'antd';
import anime from 'animejs/lib/anime.es.js';

export default function Ai() {
  const [meal, setMeal] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const meatballLoadRef = useRef(null);
  const ratRef = useRef(null);

  useEffect(() => {
    anime({
      targets: meatballLoadRef.current,
      rotateZ: 360,
      loop: true,
      easing: 'linear'
    })
  }, []);

  useEffect(() => {
    anime({
      targets: ratRef.current,
      rotateZ: 360,
      loop: true,
      easing: 'linear'
    })
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/ai/getRecipe', {
        meal: inputValue
      });
      console.log('can i get uhhhhhhhh', response.data.recipe);
      setMeal(response.data.recipe);
    } catch (error) {
      console.error("An error occurred while fetching the recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value)
  }
  return (
    <div>
      <NavBar/>
      <h1 className='text-6xl flex justify-center'>Let's Get Cookin'!</h1>
      <div className="flex justify-center mt-5 mb-5">
        <h3 className='text-2xl w-2/3 text-center'>Get ready to level up your culinary game with GrocRE's cutting-edge AI! Just toss in your wildest recipe idea or the ingredients you've got in your kitchen, and watch the magic happen - voilà!</h3>
      </div>
      <div className='flex flex-row justify-center mb-5 space-x-4'>
        <Input
          placeholder="Can I get uhhhhhhhh..." value={inputValue} onChange={handleInput}
          className='w-2/4 text-xl'
        ></Input>
        <Button onClick={handleSearch} className='text-xl h-fit w-fit'>Submit</Button>
      </div>
      {loading ? <div className='flex justify-center'> <img ref={meatballLoadRef} src='../../../public/meatball.png' className='w-10 h-10'/> </div>: null}
      <div className='flex flex-row ml-5'>
      <div className='flex flex-col w-1/3 relative'>
          <div className='absolute top-0 right-0'>
            <Rate count='1' className='flex '></Rate>
          </div>
          <img
          ref={ratRef}
            src="https://bolt-gcdn.sc-cdn.net/3/iAgMd936GPdlxahIYCPlt?bo=EhgaABoAMgF9OgEEQgYI_bOh9AVIAlASYAE%3D&uc=18"
            className='w-fit self-center'
          />
          <div className='border-2 mt-5'>
            Nutrition:
          </div>
        </div>
        <div className='flex flex-col w-2/3 mr-5 ml-5'>
          <div>{meal}</div>
          <div className='border-2'>
            Description:
          </div>
          <div className='border-2 mt-5'>
            Ingredients:
          </div>
          <div className='border-2 mt-5'>
            Directions:
          </div>
        </div>
      </div>
    </div>
  );
}
