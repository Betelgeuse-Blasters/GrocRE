import { useEffect, useState } from 'react';

// Helpers
import Api from './api.js';

// Components
import NavBar from "../../Components/NavBar";
import NavMenu from './Menu';
import Meal from './Meals/Meal';

const MealPlan = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [focused, setFocused] = useState({});
  const [changed, setChanged] = useState(false);
  const api = new Api('/mealplans');

  useEffect(() => {
    api.get()
      .then((response) => {
        setMealPlans(response)
        setFocused(response[0])
      })
      .catch(err => console.log('mealplans get err', err));
  }, [])

  useEffect(() => {
    if (changed) {
      const api = new Api('/mealplans');
      api.get()
      .then((response) => {
        setMealPlans(response)
        setFocused(response[0])
      })
      .catch(err => console.log('mealplans get err', err));
      console.log('mealplans changed', changed)
    }
  }, [changed])

  return (
    <>
      <div> <NavBar /> </div>
      <div className="flex">
        <div className="flex-none">
          <NavMenu mealPlans={mealPlans} setMealPlans={setMealPlans} setFocused={setFocused} api={api} />
        </div>
        <div className="flex-1 mr-[5%]">
          <Meal focusedMealPlan={focused} changed={changed} setChanged={setChanged}/>
        </div>
      </div>
    </>
  );
}

export default MealPlan;