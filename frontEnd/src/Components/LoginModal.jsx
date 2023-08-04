import { Form, Input, Button, Radio } from "antd";
import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL
const PORT = import.meta.env.VITE_PORT

export default function LoginModal({ handleLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [form] = Form.useForm();

  const toggleSignup = (e) => {
    setIsSignup(e.target.value === "true");
  };

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);

    const endpoint = `${API_URL}:${PORT}/auth/login`;

    const payload = {
      nickname: values.nickname,
      password: values.password
    };
    if (isSignup) {
      payload.name = values.name;
      payload.email = values.email;
    }
    try {
      const response = await axios.post(endpoint, payload);

      if (response.status === 200) {
        console.log("Successfully logged in or signed up", response.data);
        form.resetFields();
        handleLogin();
      } else {
        console.error("Failed to log in or sign up");
      }
    } catch (error) {
      console.error("An error occurred:", error);
  }

}

  return (
    <Form onFinish={onFinish} form={form}>
        <Form.Item
          label="Username"
          name="nickname"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        {isSignup && (
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>
      )}
      {isSignup && (
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
      )}
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isSignup ? "Sign Up" : "Login"}
        </Button>
        <Radio.Group onChange={toggleSignup} value={isSignup.toString()}>
          <Radio value="false">Login</Radio>
          <Radio value="true">Sign Up</Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
}
