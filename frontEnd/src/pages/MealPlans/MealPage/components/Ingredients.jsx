/* eslint-disable */
import React, { useState } from 'react';

import { EditOutlined } from '@ant-design/icons';
import Input from 'antd/es/input/Input';


const Ingredients = ({ meal, setMeal, saveMeal }) => {
  const [editing, setEditing] = useState(false);
  let ingredients = meal?.ingredients;

  if (!ingredients) {
    console.log(meal, 'meal');
    ingredients = [];
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
          {fractionFactory(item[0])} {item[1]} {item[2]}
        </li>
      :
        <>
        <Input
          className='list-disc ml-5 mb-3'
          key={index}
          defaultValue={`${fractionFactory(item[0])} ${item[1]} ${item[2]}`}
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