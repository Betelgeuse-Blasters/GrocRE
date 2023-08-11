/* eslint-disable */
import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';

let NewMealPlan = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  // Function to handle form submission
  const onFinish = () => {
    form.validateFields().then(values => {
      onSubmit(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      open={visible}
      title="Add a Meal Plan"
      onCancel={onCancel}
      onOk={onFinish}
      okButtonProps={{
        children: "Custom OK",
        className: 'bg-[#000]'
      }}
      cancelButtonProps={{
        children: "Custom cancel"
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name of Meal Plan"
          name="name"
          rules={[{ required: true, message: 'Please enter a name for your meal plan' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description for Meal Plan"
          name="description"
          rules={[{ required: true, message: 'Please enter a description for your meal plan' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewMealPlan;