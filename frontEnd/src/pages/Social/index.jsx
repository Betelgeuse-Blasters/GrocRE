import { Space } from "antd";
import {useEffect, useState} from 'react';
import SideBar from "./components/Sidebar";
import PageContent from "./components/PageContent";
import"./styles/sns.css"
import axios from "axios"

export default function Sns() {
  const [meals, setMeals] = useState([]);
  const [mealplans, setMealPlans] = useState([]);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_PORT}/sns/meals?userid=${1}`).then((response) => {
      setMeals(response.data)
    })
    axios.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_PORT}/sns/mealplans?userid=${1}`).then((response) => {
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
        <SideBar meals={meals} mealplans={mealplans}/>
        <PageContent meals={meals} style={{justifyContent: "center", display:"flex"}}/>
      </Space>
    </div>
  );
}
