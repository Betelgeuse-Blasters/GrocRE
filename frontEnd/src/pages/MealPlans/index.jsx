import React from 'react';
import NavBar from "../../Components/NavBar";

import NavMenu from './Menu';
import Meal from './Meals/Meal';

const MealPlan = () => {
  const [focused, setFocused] = React.useState({});
  const [ingredients, setIngredients] = React.useState([]);

  return (
    <>
      <div> <NavBar /> </div>
      <div className="flex">
        <div className="flex-none">
          <NavMenu setFocused={setFocused} setIngredients={setIngredients}/>
        </div>
        <div className="flex-1">
          <Meal meal={focused}/>
        </div>
      </div>
    </>
  );
}

export default MealPlan;