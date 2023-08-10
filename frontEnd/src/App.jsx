import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import UserContext from "./Context/User.js";
import Home from "./pages/Home/Home";
import MealPlan from "./pages/MealPlans";
import Ai from "./pages/AI/Ai";
import Sns from "./pages/Social";
import Meal from "./pages/Meal/Meal.jsx"
import Profile from "./pages/Profile/Profile";
import NavBar from "./Components/NavBar.jsx"
import Footer from "./Components/Footer";
import API from './Helper/API.js';

import "./main.css";

export default function App() {
  //on mount verify user information

  const [user, setUser] = useState({ loggedIn: false });
  const [mealID, setMealID] = useState(null)
  useEffect(() => {
    //
    //Talk to server
    //Hey does this session match any users?
    // if it does, give me that users id, user name, etc
    //
    API.GET_USER_INFO()
      .then((response) => {
        setUser({ ...response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className='bg-image min-h-screen'>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Ai setMeal={setMealID}/>} />
        <Route path="/create_recipe" element={<Ai setMeal={setMealID}/>} />
        {/* <Route path="/account" element={<Profile setMeal={setMealID}/>} /> */}
        <Route path="/3DMeal" element={<MealPlan setMeal={setMealID}/>} />
        <Route path="/Feed/*" element={<Sns setMeal={setMealID}/>} />
        <Route path="/meal/:mealID" element={<Meal />} />
      </Routes>
      <Footer className=''/>
      </div>
    </UserContext.Provider>
  );
}

