/* eslint-disable */
import React, { useState } from 'react';
import { Modal } from 'antd';

// Helpers
import { getMealPlanIngredients } from '../../helpers.js';

export const IngredientsModal = ({mealPlan}) => {
  const [visible, setVisible] = useState(false);
  const [copiedText, setCopiedText] = useState('Copy');
  let ingredients = getMealPlanIngredients(mealPlan);
  console.log(ingredients);

  const onOk = () => {};
  const onCancel = () => {setVisible(false)};
  const onFinish = (e) => {
    navigator.clipboard.writeText(ingredients.join('\n'));
    setCopiedText('Copied!');
    setTimeout(() => {
      setCopiedText('Copy');
    }, 1500);
  };

  return (
    <>
      <button className="pr-[2rem] text-center" onClick={(e) => setVisible(true)}>View Ingredients</button>
      <Modal
        visible={visible}
        title="Add a Meal Plan"
        onCancel={onCancel}
        cancelText="Close"
        cancelButtonProps={{
          // children: "Custom cancel"
        }}

        onOk={onFinish}
        okText={copiedText}
        okButtonProps={{
          className: 'bg-[#000]'
        }}
      >
        {
          ingredients.map((ingredient, index) => {
            return (
              <div key={index}>
                <p>{ingredient.join(' ')}</p>
              </div>
            );
          })
        }
      </Modal>
    </>

  );
}

export default { IngredientsModal };