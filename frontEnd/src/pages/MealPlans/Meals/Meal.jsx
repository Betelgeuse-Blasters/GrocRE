/* eslint-disable */
import React, { useState, useRef } from 'react';
import { Tabs, Button } from 'antd';

// Helpers
import { getTabMenuItems } from '../helpers';
import Api from '../api';
// Components
import { MealPage } from '../MealPage/MealPage.jsx';
import { IngredientsModal } from './modals/IngredientsModal.jsx';
import { AddMealPage } from '../MealPage/AddMealPage.jsx';

const Meal = ({focusedMealPlan, setChanged}) => {
  const [activeKey, setActiveKey] = useState(undefined);
  const [items, setItems] = useState([]);

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
    console.log('on change', activeKey)
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

  const DeleteButton = () => {
    const clickHander = (e) => {
      e.preventDefault();
      let api = new Api();
      api.delete('/' + focusedMealPlan.id)
      setChanged(true);
    };

    return (
      <Button
        danger
        onClick={clickHander}
      >Delete Meal Plan</Button>
    );
  }

  const activeComponent = (focusedMealPlan) => {
    if (focusedMealPlan && focusedMealPlan.recipes && focusedMealPlan.recipes.length) {
      const tabContent = tabItems();
      let defaultActiveKey = tabContent[0].key;

      return (
        <Tabs
          type="editable-card"
          onChange={onChange}
          activeKey={activeKey ?? defaultActiveKey}
          onEdit={onEdit}
          items={tabItems()}
          tabBarExtraContent={{ left: <DeleteButton />, right: <IngredientsModal mealPlan={focusedMealPlan} />}}
          hideAdd={true}
        />
      )
    } else if (focusedMealPlan?.id){
      return <AddMealPage mealPlanId={focusedMealPlan?.id} setChanged={setChanged} />
    } else {
      return <div></div>
    }
  };

  return (
    activeComponent(focusedMealPlan)
  );

};

export default Meal;