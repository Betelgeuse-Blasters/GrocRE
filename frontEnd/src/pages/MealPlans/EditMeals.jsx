import { useState } from 'react';

import { Col, Row } from 'antd';

import * as dummyMeals from './dummyMeals.json';



function MealMenu({meals}) {
  return (
    <div>
      {
        meals.map((meal, i) => {
          return <button
            key={i}
            style={{display: 'block'}}>{meal.name}
            </button>
        })
      }
    </div>
  )

}

function Ingredients({ingredients}) {

  return (
    <>

    </>
  );
}

function Recipe({recipe}) {
  console.log('recipe', recipe);
  return (
    <div>
      <p>Name: {recipe.name}</p>
      <p>Serves: {recipe.serving}</p>
      {
        recipe.ingredients.map((ingredient) => {
          return <p>{ingredient.name}</p>
        })
      }
    </div>
  );
}

function Meal({meal, isEditing, mealEdits, setMealEdits}) {
  const mealNameChange = (e) => {
    // let edits = { name: e.target.value };

    // let update = Object.assign({}, ...edits);
    // console.log(update);
    // setMealEdits()
  }


  return (
    <>
      <h3>
        {
          isEditing
          ? <input onChange={mealNameChange} placeholder={meal.name} />
          : meal.name
        }
      </h3>
      {
        meal.recipes.map((recipe, i) => {
          return <Recipe key={i} recipe={recipe} />
        })
      }

    </>
  );
}

function EditMeal() {
  let meals = dummyMeals.default;
  const [activeMeal, setActiveMeal] = useState(meals[0]);
  const [mealEdits, setMealEdits] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Row>
        <Col span={6}>
          <button onClick={(e) => setIsEditing(!isEditing)}>Edit</button>
          <MealMenu
            meals={meals}
            setActiveMeal={setActiveMeal}

          />
        </Col>
        <Col span={6}>
          <Meal meal={activeMeal} isEditing={isEditing} mealEdits={mealEdits} setMealEdits={setMealEdits}/>
        </Col>
      </Row>
    </>
  );

}

export default EditMeal;