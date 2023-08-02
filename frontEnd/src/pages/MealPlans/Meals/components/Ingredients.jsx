/* eslint-disable */
import { RollbackOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Collapse, Input, InputNumber, Button } from 'antd';

const Ingredient = ({ingredient}) => {
  const [amount, setAmount] = useState(ingredient[0]);
  const [unit, setUnit] = useState(ingredient[1]);
  const [name, setName] = useState(ingredient[2]);

  //@TODO - Fix items with only 2 array elements ex. [2, eggs]

  return (
    <div className='flex'>
      <div>
        <span>{ingredient[0]}</span>
        <span>{ingredient[1]}</span>
        <span>{ingredient[2] && ingredient[0]}</span>
      </div>
    </div>
  );
}

const Ingredients = ({ingredients, setIngredients}) => {
  const [editing, setEditing] = useState(false);
  const [changes, setChanges] = useState(ingredients);
  console.log('recipe ingredients', ingredients)
  const editActions = () => {
    return (
      <>
        {
          editing ?
          <>
            <RollbackOutlined onClick={(e) => { e.stopPropagation(); }} style={{'marginRight': '1rem'}} />
            <CheckOutlined onClick={(e) => { e.stopPropagation(); setEditing(false); }} />
          </>
          : <EditOutlined onClick={(e) => {e.stopPropagation(); setEditing(true)}}/>
        }
      </>
    )
  }

  const items = {
    key: 'ingredients',
    label: 'Ingredients',
    children: ingredients.map((ingredient) => <Ingredient editing={editing} ingredient={ingredient} setIngredient={changes}/>),
    extra: editActions()
  };

  const recordActions = () => {
    return (
      <div className='flex justify-between my-[1rem]'>
        <Button>Delete</Button>
        <Button style={{color: 'white', backgroundColor: '#1677ff'}}>Add New</Button>
      </div>
    );
  }
  items.children.push(recordActions());


  return (
    <>
      <Collapse
        defaultActiveKey={['1']}
        items={[items]}
      />
    </>
  );

}

export default Ingredients;