import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from "../../NavBar";
import {Input} from 'antd';
import { Button} from 'antd';


export default function Ai() {
  const [meal, setMeal] = useState('');
  const [inputValue, setInputValue] = useState('');


  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:3000/ai/getRecipe', {
        meal: inputValue
      });
      console.log('can i get uhhhhhhhh',response.data.recipe);
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
      <div style={{display: "flex", flexDirection: "row"}}>
        <Input placeholder="Can I get auhhhh..." value={inputValue} onChange={handleInput}></Input>
        <Button onClick={handleSearch} >Submit</Button>
      </div>
      <div style={{display: "flex", flexDirection: "row"}}>
        <div style={{display: "flex", flexDirection: "column"}}>
          <img src="https://bolt-gcdn.sc-cdn.net/3/iAgMd936GPdlxahIYCPlt?bo=EhgaABoAMgF9OgEEQgYI_bOh9AVIAlASYAE%3D&uc=18" />
          <div>Nutrition:</div>
        </div>
        <div style={{display: "flex", flexDirection: "column"}}>
          <div>{meal}</div>
          <div>Description:</div>
          <div>Ingredients:</div>
          <div>Directions:</div>
        </div>
      </div>
    </div>
  );
}
