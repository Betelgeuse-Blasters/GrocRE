/* eslint-disable */
import React, { useState, useRef } from 'react';
import { Tabs } from 'antd';

// Helpers
import { getTabMenuItems } from '../helpers';
import Api from '../api';
// Components
import { MealPage } from '../MealPage/MealPage.jsx';
import { IngredientsModal } from './modals/IngredientsModal.jsx';

const Meal = ({focusedMealPlan, setChanged}) => {
  const [activeKey, setActiveKey] = useState(0);
  const [items, setItems] = useState([]);

  // const newTabIndex = useRef(0);

  const tabItems = () => {
    let mp = focusedMealPlan?.recipes?.map((recipe) => {
      return {
        key: recipe.id,
        label: recipe.recipeName,
        children: <MealPage recipe={recipe} setChanged={setChanged}/>
      }
    });

    return mp;
  };

  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey) => {
    let api = new Api('');
    api.delete(`/mealplans/${focusedMealPlan.id}/recipe/${targetKey}`)
    .then((res) => window.alert('Recipe removed from meal plan.'))
    .catch((err) => window.alert('Error removing recipe from meal plan.'))
    .finally(() => setChanged(true));

    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
  });

  const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (targetKey, action) => {
    remove(targetKey);
  };

  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={tabItems()}
      tabBarExtraContent={{ left: <button onClick={(e) => { let api = new Api(); api.delete('/' + focusedMealPlan.id); }}className="px-[2rem] text-center">Delete Meal Plan</button>, right: <IngredientsModal mealPlan={focusedMealPlan} />}}
      hideAdd={true}
    />
  );

};

export default Meal;