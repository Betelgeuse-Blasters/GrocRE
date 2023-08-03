import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import UserContext from "./Context/User.js";
import Home from "./pages/Home/Home";
import MealPlan from "./pages/MealPlans/MealPlan";
// import EditingUtility from "./pages/MealPlans/index.jsx";
import Ai from "./pages/AI/Ai";
import Sns from "./pages/Social";
import Meal from "./pages/Meal/Meal.jsx"
import axios from "axios";
import Profile from "./pages/Profile/Profile";

import "./main.css";
var testData = {
  "recipeName": "Cheesy Mashed Potatoes",
  "recipeDescription": "Creamy mashed potatoes with melted cheese on top.",
  "recipeSteps": [
    ["1. Wash and peel the potatoes."],
    ["2. Cut the potatoes into small chunks."],
    ["3. Boil the potatoes in a pot of salted water until tender, about 15-20 minutes."],
    ["4. Drain the potatoes and return them to the pot."],
    ["5. Mash the potatoes using a potato masher or a fork until smooth."],
    ["6. Add butter, milk, and shredded cheese to the mashed potatoes."],
    ["7. Stir the mixture until the cheese is melted and well combined."],
    ["8. Season the cheesy mashed potatoes with salt and pepper to taste."],
    ["9. Serve hot and enjoy!"]
  ],
  "servingSize": 4,
  "nutritionFacts": {
    "calories": 300,
    "totalFat": 12,
    "saturatedFat": 6,
    "cholesterol": 25,
    "sodium": 400,
    "carbohydrates": 40,
    "fiber": 4,
    "sugars": 2,
    "protein": 8
  },
  "ingredients": [
    ["2.5", "pounds", "potatoes"],
    ["4", "tablespoons", "butter"],
    ["1", "cup", "milk"],
    ["2", "cups", "shredded cheese"],
    ["1.5", "teaspoons", "salt"],
    ["0.5", "teaspoon", "pepper"]
  ]
};
export default function App() {
  //on mount verify user information
  const [user, setUser] = useState({ loggedIn: false });
  const [mealID, setMealID] = useState(testData)
  useEffect(() => {
    //
    //Talk to server
    //Hey does this session match any users?
    // if it does, give me that users id, user name, etc
    //
    axios
      .get("http://localhost:3000/editor/api/login", {
        withCredentials: true,
      })
      .then((response) => {
        setUser({ ...response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className='bg-image'>
      <Routes>
        <Route path="/" element={<Home setMeal={setMealID}/>} />
        <Route path="/ai" element={<Ai setMeal={setMealID}/>} />
        <Route path="/account" element={<Profile setMeal={setMealID}/>} />
        <Route path="/mealplan" element={<MealPlan setMeal={setMealID}/>} />
        <Route path="/sns/*" element={<Sns setMeal={setMealID}/>} />
        <Route path="/meal/:mealID" element={<Meal />} />
      </Routes>
      </div>
    </UserContext.Provider>
  );
}

