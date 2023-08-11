/* eslint-disable */
import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import Input from 'antd/es/input/Input';
import FractionFactory from '../../../../Helper/FractionFactory.js';


const Ingredients = ({ meal, setMeal, saveMeal }) => {
  const [editing, setEditing] = useState(false);
  let ingredients = meal?.ingredients;

  if (!ingredients) {
    console.log(meal, 'meal');
    ingredients = [];
  }


return (
  <>
  <h1 className='text-4xl font-medium text-center mb-3'>
    ingredients:
    {
      !editing
      ?
        <EditOutlined
          className='ml-[1rem] text-[0.5em] align-text-top'
          onClick={() => setEditing(true)}
        />
      :
        <button
          className='ml-[1rem] text-[0.5em] align-text-top'
          onClick={() => {
            setEditing(false);
            saveMeal();
          }}
        >
          Save
        </button>
    }

  </h1>

  <ul className='text-xl ml-5 mb-5'>
    {
    ingredients.map((item, index) => (

      !editing
      ?
        <li
          className='list-disc ml-5 mb-3'
          key={index}>
          {FractionFactory(item[0])} {item[1]} {item[2]}
        </li>
      :
        <>
        <Input
          className='list-disc ml-5 mb-3'
          key={index}
          defaultValue={`${FractionFactory(item[0])} ${item[1]} ${item[2]}`}
          onChange={(e) => {
            let newIngredients = ingredients;
            newIngredients[index] = e.target.value.split(' ');
            setMeal({...meal, ingredients: newIngredients});
          }}
        />
        </>

  ))}
  </ul>
  </>
);
};

export default Ingredients;