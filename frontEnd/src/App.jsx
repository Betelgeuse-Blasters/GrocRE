import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Account/Login";
import MealPlan from "./pages/MealPlans/MealPlan";
import Ai from "./pages/AI/Ai";
import Sns from "./pages/Social";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ai" element={<Ai />} />
      <Route path="/account" element={<Login />} />
      <Route path="/mealplan" element={<MealPlan />} />
      <Route path="/sns" element={<Sns />}>
        <Route path="home" />
      </Route>
    </Routes>
  );
}
