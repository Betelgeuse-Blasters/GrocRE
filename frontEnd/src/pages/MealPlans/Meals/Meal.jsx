/* eslint-disable */
import React, { useState, useRef } from 'react';
import { Tabs } from 'antd';

// Helpers
import { getTabMenuItems } from '../helpers';

// Components
import { MealPage } from '../MealPage/MealPage.jsx';
import { IngredientsModal } from './modals/IngredientsModal.jsx';

const Meal = ({focusedMealPlan, setChanged}) => {
  const [activeKey, setActiveKey] = useState(0);
  const [items, setItems] = useState();

  const newTabIndex = useRef(0);

  const tabItems = () => {
    let mp = focusedMealPlan?.recipes?.map((recipe) => {
      console.log(recipe.id);
      return {
        key: recipe.id,
        label: recipe.recipeName,
        children: <MealPage recipe={recipe} setChanged={setChanged}/>
      }
    });

    return mp;
  };

  const onChange = (newActiveKey) => {
    console.log('newActiveKey', newActiveKey);
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: 'New Tab',
      children: 'Content of new Tab',
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey) => {
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
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={tabItems()}
      tabBarExtraContent={{ right: <IngredientsModal mealPlan={focusedMealPlan} />}}
    />
  );

};

export default Meal;