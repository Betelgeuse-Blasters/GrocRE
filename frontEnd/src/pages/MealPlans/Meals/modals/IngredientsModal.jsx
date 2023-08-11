/* eslint-disable */
import React, { useState } from 'react';
import { Modal } from 'antd';

// Helpers
import { getMealPlanIngredients } from '../../helpers.js';
import FractionFactory from '../../../../Helper/FractionFactory.js';

export const IngredientsModal = ({mealPlan}) => {
  const [visible, setVisible] = useState(false);
  const [copiedText, setCopiedText] = useState('Copy');
  let ingredients = getMealPlanIngredients(mealPlan);

  const onOk = () => {};
  const onCancel = () => {setVisible(false)};
  const onFinish = (e) => {
    navigator.clipboard.writeText(FreactionFactory(ingredients).join('\n'));
    setCopiedText('Copied!');
    setTimeout(() => {
      setCopiedText('Copy');
    }, 1500);
  };

  return (
    <>
      {ingredients.length > 0 && <>
      <button className="pr-[2rem] text-center" onClick={(e) => setVisible(true)}>View Ingredients</button>
      <Modal
        open={visible}
        title="Ingredients"
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
                <p>{FractionFactory(ingredient).join(' ')}</p>
              </div>
            );
          })
        }
      </Modal>
      </>}
    </>

  );
}

export default { IngredientsModal };