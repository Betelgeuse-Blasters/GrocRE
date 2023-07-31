import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from "../../NavBar";
import { Input, Button, Rate } from 'antd';


export default function Ai() {
  const [meal, setMeal] = useState('');
  const [inputValue, setInputValue] = useState('');


  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:3000/ai/getRecipe', {
        meal: inputValue
      });
      console.log('can i get uhhhhhhhh', response.data.recipe);
      setMeal(response.data.recipe);
    } catch (error) {
      console.error("An error occurred while fetching the recipe:", error);
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <div>
      <NavBar />
      <div className='flex flex-row justify-center mb-5 space-x-4'>
        <Input
          placeholder="Can I get uhhhhhhhh..." value={inputValue} onChange={handleInput}
          className='w-2/4'
        ></Input>
        <Button onClick={handleSearch}>Submit</Button>
      </div>
      <div className='flex flex-row ml-5'>
        <div className='flex flex-col w-1/3 relative'>
          <div className='absolute top-0 right-0'>
            <Rate count='1' className='flex '></Rate>
          </div>
          <img
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
