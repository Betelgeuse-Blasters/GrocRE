import { useState, useEffect, useMemo, useContext } from 'react';
import API from '../../Helper/API.js';
import { useNavigate } from 'react-router-dom';

const RecentMeals = () => {
  // const{user} = useContext(user)
  // const testIds = useMemo(()=>[21, 22, 23, 24]); // change the ars to 1(axios call) 2(login state)
  const testIds = [44, 45, 46, 47];
  const navigate = useNavigate();
  const [mealData, setMealData] = useState([])

  useEffect(() => {
    (async () => {
      const meals = [];
      const photos = ["/KielMeal.jpg", "/Spaghetti.jpg", "/fingers.jpg", "/EggSalad.jpg"];
      for (let i = 0; i < testIds.length; i++) {
        const meal = await API.GET_MEAL(testIds[i]);
        meals.push({ id: testIds[i], name: meal.data.recipeName, description: meal.data.recipeDescription, photoUrl: photos[i] });
      }
      setMealData(meals);
    })();
  }, []);

  //  }, [testIds]);

  const handleCardClick = (mealId) => {
    navigate(`/meal/${mealId}`)
  };

  return (
    <div className='flex flex-row justify-between'>
      {mealData.map((meal, index) => (
        <div key={index} className='border border-[#CCC] p-5 w-[23%] rounded bg-[#FFF]/30 cursor-pointer '
          onClick={() => handleCardClick(meal.id)}>
          <div className='flex items-center'>
            <div className='aspect-square w-1/2 h-1/2 rounded-full overflow-hidden'>
              <img src={meal.photoUrl} alt="Meal" className='h-full w-auto rounded-full overflow-hidden object-cover' />
            </div>
            <div className='flex flex-col text-center justify-center w-1/2 h-1/2'>
              <h3 className='text-base xl:text-2xl font-semibold'>{meal.name}</h3>
              <h5 className='text-base xl:text-xl mt-5 text-center overflow-auto'>{meal.description}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentMeals;
