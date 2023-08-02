import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import UserContext from "./Context/User.js";
import Home from "./pages/Home/Home";
import MealPlan from "./pages/MealPlans/MealPlan";
// import EditingUtility from "./pages/MealPlans/index.jsx";
// import Ai from "./pages/AI/Ai";
import Sns from "./pages/Social";
import axios from "axios";
import Profile from "./pages/Profile/Profile";

export default function App() {
  //on mount verify user information
  const [user, setUser] = useState({ loggedIn: false });
  useEffect(() => {
    //
    //Talk to server
    //Hey does this session match any users?
    // if it does, give me that users id, user name, etc
    //
    axios
      .get("http://localhost:3000/editor/api/login", {
        // withCredentials: true,
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Ai />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/mealplan" element={<MealPlan />} />
        <Route path="/sns/*" element={<Sns />} />
      </Routes>
    </UserContext.Provider>
  );
}
