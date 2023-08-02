/* eslint-disable */

import { useState, useContext } from "react";

import { Col, Row } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import * as dummyMeals from "./dummyMeals.json";

import UserContext from "../../Context/User.js";

function MealMenu({ meals }) {
  return (
    <div>
      {meals.map((meal, i) => {
        return (
          <button key={i} style={{ display: "block" }}>
            {meal.name}
          </button>
        );
      })}
    </div>
  );
}

function Ingredient({ ingredient, isEditing, mealEdits, setMealEdits }) {
  const ingredientNameChange = (e) => {};
  const changeName = (e) => {};
  const amountChange = (e) => {};

  return (
    <>
      {isEditing ? (
        <>
          <input
            onChange={ingredientNameChange}
            placeholder={ingredient.name}
          />
          <button onClick={changeName}></button>
        </>
      ) : (
        ingredient.name
      )}
      {isEditing ? (
        <>
          <input
            onChange={amountChange}
            placeholder={ingredient.amount.value}
          />
        </>
      ) : (
        <>{ingredient.amount.value}</>
      )}
    </>
  );
}

function Step({ step, isEditing, mealEdits, setMealEdits }) {
  const stepChange = (e) => {};

  return (
    <>
      {isEditing ? (
        <>
          <input onChange={stepChange} placeholder={step.text} />
        </>
      ) : (
        <>{step.text}</>
      )}
    </>
  );
}

function Recipe({ recipe, isEditing, mealEdits, setMealEdits }) {
  const recipeNameChange = (e) => {};
  const changeName = (e) => {};

  return (
    <div>
      {isEditing ? (
        <>
          <input onChange={recipeNameChange} placeholder={recipe.name} />
          <button onClick={changeName}></button>
        </>
      ) : (
        recipe.name
      )}
      <p>Serves: {recipe.serving}</p>
      {recipe.ingredients.map((ingredient) => {
        return (
          <Ingredient
            ingredient={ingredient}
            isEditing={isEditing}
            mealEdits={mealEdits}
            setMealEdits={setMealEdits}
          />
        );
      })}

      {recipe.steps.map((step) => {
        return (
          <Step
            step={step}
            isEditing={isEditing}
            mealEdits={mealEdits}
            setMealEdits={setMealEdits}
          />
        );
      })}
    </div>
  );
}

function Meal({ meal, isEditing, mealEdits, setMealEdits }) {
  const [changes, setChanges] = useState(meal);
  const handleChange = (e) => {
    // let edits = { name: e.target.value };
    setChanges({ ...changes, [e.target.name]: e.target.value });
    // let update = Object.assign({}, ...edits);
    // console.log(update);
    // setMealEdits()
  };

  const mealNameChange = (e) => {};

  const changeName = (e) => {};

  const confirmChanges = (e) => {};
  const cancelChanges = (e) => {};

  return (
    <>
      <h3>
        {isEditing ? (
          <>
            <input
              onChange={mealNameChange}
              name="name"
              placeholder={meal.name}
            />
            <button onClick={cancelChanges}>
              <CloseOutlined />
            </button>
            <button onClick={confirmChanges}>
              <CheckOutlined />
            </button>
          </>
        ) : (
          meal.name
        )}
      </h3>
      {meal.recipes.map((recipe, i) => {
        return (
          <Recipe
            key={i}
            recipe={recipe}
            isEditing={isEditing}
            mealEdits={mealEdits}
            setMealEdits={setMealEdits}
          />
        );
      })}
    </>
  );
}

function EditMeal() {
  let meals = dummyMeals.default;
  const [activeMeal, setActiveMeal] = useState(meals[0]);
  const [mealEdits, setMealEdits] = useState(meals[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useContext(UserContext);

  return (
    <>
      <Row>
        <Col span={6}>
          <button onClick={(e) => setIsEditing(!isEditing)}>Edit</button>
          <MealMenu meals={meals} setActiveMeal={setActiveMeal} />
        </Col>
        <Col span={6}>
          {user.loggedIn ? `Hello, ${user.name}` : `Hello, ANONYMOUS`}
          <Meal
            meal={activeMeal}
            isEditing={isEditing}
            mealEdits={mealEdits}
            setMealEdits={setMealEdits}
          />
        </Col>
      </Row>
    </>
  );
}

export default EditMeal;
