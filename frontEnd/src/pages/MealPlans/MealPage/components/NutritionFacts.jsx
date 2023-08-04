/* eslint-disable */

import React from 'react';

const NutritionFacts = ({meal}) => {
  return (
    <div>
      <section style={{ border: '1px solid black', margin: '20px', float: 'left', width: '1/3', padding: '0.5rem' }}>
        <header style={{ borderBottom: '5px solid black', padding: '0 0 0.25rem 0', margin: '0 0 0.5rem 0' }}>
          <h1 style={{ fontWeight: 'bold', fontSize: '2rem', margin: '0 0 0.25rem 0' }}>Nutrition Facts</h1>
          <p style={{ margin: '0' }} className='text-lg'>Serving Size: {meal.servingSize}</p>
        </header>
        <table style={{ width: '100%' }} className='text-left text-lg'>
          <thead>
            <tr className='border-b border-[#000000]'>
              <th colSpan="3" style={{ border: '0' }}>
                Amount Per Serving
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan="2" className='border-b-4 border-[#000000] font-normal'>
                <b>Calories: </b>
                &nbsp;{meal.nutritionFacts.calories} kCal
              </th>
            </tr>
            <tr className='border-b border-[#000000]'>
              <th colSpan="2" className='font-normal'>
                <b>Total Fat: </b>
                &nbsp;{meal.nutritionFacts.totalFat}g
              </th>
            </tr>
            <tr className='border-b border-[#000000]'>
              <td style={{ width: '1rem', borderTop: '5px' }}></td>
              <th className='font-normal'>
                Saturated Fat:
                &nbsp;{meal.nutritionFacts.saturatedFat}g
              </th>
            </tr>
            <tr className='border-b border-[#000000]'>
              <th colSpan="2" className='font-normal'>
                <b>Cholesterol: </b>
                &nbsp;{meal.nutritionFacts.cholesterol}mg
              </th>
            </tr>
            <tr className='border-b border-[#000000]'>
              <th colSpan="2" className='font-normal'>
                <b>Sodium: </b>
                &nbsp;{meal.nutritionFacts.sodium}mg
              </th>
            </tr>
            <tr className='border-b border-[#000000]'>
              <th colSpan="2" className='font-normal'>
                <b>Total Carbohydrate: </b>
                &nbsp;{meal.nutritionFacts.carbohydrates}g
              </th>
            </tr>
            <tr className='border-b border-[#000000]'>
              <td style={{ width: '1rem', borderTop: '0' }}></td>
              <th className='font-normal'>
                Dietary Fiber:
                &nbsp;{meal.nutritionFacts.fiber}g
              </th>
            </tr>
            <tr className='border-b border-[#000000]'>
              <td style={{ width: '1rem', borderTop: '0' }}></td>
              <th className='font-normal'>
                Sugars:
                &nbsp;{meal.nutritionFacts.sugars}g
              </th>
              <td></td>
            </tr>
            <tr style={{ borderBottom: '5px solid black' }}>
              <th colSpan="2" className='font-normal'>
                <b>Protein: </b>
                &nbsp;{meal.nutritionFacts.protein}g
              </th>
              <td></td>
            </tr>
          </tbody>
        </table>

        <p className='text-sm'>* Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs:</p>

      </section>
    </div>
  );
};

export default NutritionFacts;
