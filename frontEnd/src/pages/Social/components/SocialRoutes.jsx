import { Outlet, Route, Routes } from "react-router-dom";
import SavedMealPlans from "../pages/savedMeals/savedMeals";
import Home from "../pages/home";
import SavedMeals from "../pages/savedMeals/savedMeals";

export function SocialRoutes() {
  return (
    <div>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="savedMeals" element={<SavedMeals />} />
        <Route path="mealPlans" element={<SavedMealPlans />} />
      </Routes>
      <Outlet />
    </div>
  );
}
