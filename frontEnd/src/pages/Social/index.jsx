import { Space } from "antd";
import {useEffect, useState} from 'react';
import SideBar from "./components/Sidebar";
import PageContent from "./components/PageContent";
import"./styles/sns.css"
import axios from "axios"

export default function Sns() {
  const [meals, setMeals] = useState([]);
  const [mealplans, setMealPlans] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_PORT}/sns/meals`).then((response) => {
      setMeals(response.data)
    })
    axios.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_PORT}/sns/mealplans`).then((response) => {
      setMealPlans(response.data)
    })
  },[])

  return (
    <div className="app">
      <Space style={{
        display: "flex",
        flex: "1",
        justifyContent: "flex-start",
        alignItems: "flex-start"
      }}>
        <SideBar meals={meals} mealplans={mealplans} saved={saved}/>
        <PageContent saved={saved} setSaved={setSaved} meals={meals} style={{justifyContent: "center", display:"flex"}}/>
      </Space>
    </div>
  );
}
