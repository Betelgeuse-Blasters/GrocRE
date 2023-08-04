import { Outlet, Route, Routes } from "react-router-dom";
import Home from "../pages/home";

export function SocialRoutes() {
  return (
    <div>
      <Routes>
        <Route path="home" element={<Home />} />
      </Routes>
      <Outlet />
    </div>
  );
}
