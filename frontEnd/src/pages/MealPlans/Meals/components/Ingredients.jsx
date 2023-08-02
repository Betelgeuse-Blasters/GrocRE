/* eslint-disable */
import { RollbackOutlined, CheckOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Collapse, Select, Input, InputNumber, Button,  } from 'antd';
const { Option } = Select;

const Ingredient = ({ingredient}) => {
  const [amount, setAmount] = useState(ingredient[0]);
  const [unit, setUnit] = useState(ingredient[1]);
  const [name, setName] = useState(ingredient[2]);
  //quick fix for like [2, "eggs"]
  if (ingredient.length === 2) {
    // setUnit('');
    // setName(ingredient[1]);
  }

  useEffect(() => {

  }, [])

  return (
    <div className='flex'>
      <Input defaultValue={name}/>
      {amount && <InputNumber className='w-[10rem] text-center' defaultValue={amount} />}
      {unit && <Input className='w-[15rem]' defaultValue={unit} />}
    </div>
  );
}

const Ingredients = ({ingredients, setIngredients}) => {
  const [editing, setEditing] = useState(false);
  const [changes, setChanges] = useState(ingredients);

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
    children: ingredients.map(ingredient =>
      <Ingredient editing={editing} ingredient={ingredient} setIngredient={changes}/>),
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