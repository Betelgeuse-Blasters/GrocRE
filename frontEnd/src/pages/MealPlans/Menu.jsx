/* eslint-disable */
import { useState } from 'react';
import { Menu } from "antd";
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';

// Helpers
import { getMenuItems, getMealPlan } from './helpers.js';

// Components
import NewMealPlan from './Meals/modals/NewMealPlanModal';

const NavMenu = ({mealPlans, setMealPlans, setFocused, api}) => {
  const [modalVisible, setModalVisible] = useState(false);
  let menuItems = getMenuItems(mealPlans);
  menuItems.push({key: 'adder', label: <PlusOutlined /> });

  const menuItemClickHandler = (e) => {
    if (e.key !== 'adder') {
      let activeMeal = getMealPlan(mealPlans, e.key);
      setFocused(activeMeal);
    } else {
      setModalVisible(true);
    }
  };

  const handleSubmission = (e) => {
    let mealPlan = {
      name: e.name,
      description: e.description
    }

    api.post('', mealPlan)
    .then((response) => {
      console.log('meal plan post', response)
      setMealPlans([...mealPlans, response]);
    })
    .catch((err) => console.log('meal plan post err', err))
    .finally(() => setModalVisible(false));
  };

  return (
    <>
     <NewMealPlan
      visible={modalVisible}
      onCancel={() => {setModalVisible(false)}}
      onSubmit={handleSubmission}
    />

    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      className='text-center'
      items={menuItems}
      onClick={menuItemClickHandler}
    />
  </>
  )
}

export default NavMenu;