/* eslint-disable */
import React from 'react';
import { Menu } from "antd";
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';

// Components
import NewMealPlan from './Meals/modals/NewMealPlanModal';

const NavMenu = ({setFocused, setIngredients}) => {
  const [mealPlans, setMealPlans] = React.useState({});
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    loadMealPlans();
  }, []);

  //items would be a load of user's current meal plans + 1 addition which would be a + sign that would prompt a dialogue on the page and allow you to create a new meal plan
  let loadMealPlans = () => {
    let ingredientsStore = [];
    let store = {};
    store['menu'] = [];

    axios.get('http://localhost:3000/mealplans', {
      withCredentials: true,
    })

    .then((response) => {
      for(let plan of response.data){
        plan['label'] = plan.name;
        plan['key'] = plan.id;

        store['menu'].push({
          label : plan.name,
          key : plan.id
        });
        store[plan.id] = plan;

        plan['recipes'].forEach((recipe) => ingredientsStore.push(recipe.ingredients))
      }
    })
    .catch((error) => { console.log(error); })
    .finally(() => {
      // push add new icon
      store['menu'].push({ key: 'adder', label: <PlusOutlined />});
      console.log(ingredientsStore);
      setMealPlans(store);
      setIngredients(ingredientsStore);
    })

  };

  let handleAddition = () => {
    console.log('start dialogue prompt');
    setVisible(true);
  };

  let handleSubmission = (formData) => {
    //e.name
    //e.description
    axios.post('http://localhost:3000/editor/api/mealplans', formData, {
      withCredentials: true,
    }).then((response) => {
      //get meal plans again
      loadMealPlans();
      setVisible(false);
    }).catch((error) => {
      console.log(error);
    });
  }
  return (
    <>
    <NewMealPlan visible={visible} onCancel={() => {setVisible(false)}} onSubmit={handleSubmission}/>
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      className='text-center'
      items={mealPlans.menu}
      onClick={(e) => e.key !== 'adder' ?  setFocused(mealPlans[e.key]) : handleAddition()}
    />
  </>
  )
}

export default NavMenu;