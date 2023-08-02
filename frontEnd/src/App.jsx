import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import MealPlan from "./pages/MealPlans/MealPlan";
// import EditingUtility from "./pages/MealPlans/index.jsx";
import Ai from "./pages/AI/Ai";
import Sns from "./pages/Social";
import Profile from "./pages/Profile/Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ai" element={<Ai />} />
      <Route path="/account" element={<Profile />} />
      <Route path="/mealplan" element={<MealPlan />} />
      <Route path="/sns/*" element={<Sns />} />
    </Routes>
  );
}
