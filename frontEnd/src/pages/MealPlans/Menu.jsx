/* eslint-disable */
import { useState, useEffect } from 'react';
import { Menu } from "antd";
import { PlusOutlined } from '@ant-design/icons';

// Helpers
import { getNavMenuItems, getMealPlan } from './helpers.js';

// Components
import NewMealPlan from './Meals/modals/NewMealPlanModal';

const NavMenu = ({mealPlans, setMealPlans, setFocused, api, defaultKey}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState('0');

  useEffect(() => {
    if (mealPlans.length > 0 && activeKey === '0') {
      setActiveKey(String(mealPlans[0].id));
    }
  }, [mealPlans])


  let menuItems = getNavMenuItems(mealPlans);
  menuItems.push({key: 'adder', label: <PlusOutlined /> });


  const menuItemClickHandler = (e) => {
    if (e.key !== 'adder') {
      let activeMeal = getMealPlan(mealPlans, e.key);
      setActiveKey(e.key);
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
      console.log('meal plan post response', response)
      setMealPlans([...mealPlans, response]);
      setActiveKey(response.id);
    })
    .catch((err) => console.log('meal plan post err', err))
    .finally(() => setModalVisible(false));
  };
// console.log(menuItems, 'load');
// console.log('activeKey', activeKey);
  return (
    <>
     <NewMealPlan
      visible={modalVisible}
      onCancel={() => {setModalVisible(false)}}
      onSubmit={handleSubmission}
    />
    <div className='text-center py-3 text-2xl font-bold'>Meal Plans</div>
    {
      <Menu
        style={{ width: 256 }}
        selectedKeys={[activeKey]}
        mode="inline"
        className='text-center text-lg'
        items={menuItems}
        onClick={menuItemClickHandler}
      />
    }

  </>
  )
}

export default NavMenu;