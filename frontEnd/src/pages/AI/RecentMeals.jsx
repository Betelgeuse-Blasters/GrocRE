import { useState, useEffect } from 'react';
import API from '../../Helper/API.js';
import { useNavigate } from 'react-router-dom';

const RecentMeals = () => {
  let testIds = [21, 22, 23, 24];
  const navigate = useNavigate();
  const [mealTitles, setMealTitles] = useState([])

  useEffect(() => {
    (async () => {
      const titles = [];
      for (let i = 0; i < testIds.length; i++) {
        const meal = await API.GET_MEAL(testIds[i]);
        titles.push({ id: testIds[i], name: meal.data.recipeName });
      }
      setMealTitles(titles);
    })();
  }, []);

  const handleCardClick = (mealId) => {
    navigate(`/meal/${mealId}`)
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      {mealTitles.map((meal, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: '16px', width: '23%' }}
          onClick={()=> handleCardClick(meal.id)}>
          <img src="/eggboy.png" alt="Meal" style={{ width: '50%' }} />
          <h3>{meal.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default RecentMeals;
