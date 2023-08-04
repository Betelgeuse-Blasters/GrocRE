import { Form, Input, Button, Radio } from "antd";
import { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../Context/User.js'
const API_URL = import.meta.env.VITE_API_URL

export default function LoginModal({handleLogin}) {
  const [isSignup, setIsSignup] = useState(false);
  const [form] = Form.useForm();
  const [user, setUser] = useContext(UserContext)

  const toggleSignup = (e) => {
    setIsSignup(e.target.value === "true");
  };

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);

    const endpoint = `${API_URL}/auth/login`;

    const payload = {
      nickname: values.nickname,
      password: values.password
    };
    if (isSignup) {
      payload.name = values.name;
      payload.email = values.email;
    }
    try {
      const response = await axios.post(endpoint, payload, {withCredentials:true});

      if (response.status === 200) {
        console.log("Successfully logged in or signed up", response.data);
        form.resetFields();
        handleLogin()
        setUser({...response.data.user,loggedIn:true})
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
      <Form.Item className='flex justify-center'>
        <Radio.Group onChange={toggleSignup} value={isSignup.toString()}>
          <Radio value="false">Login</Radio>
          <Radio value="true">Sign-up</Radio>
        </Radio.Group>
        <Button type="primary" htmlType="submit" className='bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 ml-24 hover:contrast-125 text-base tracking-wide font-medium'>
          {isSignup ? "Sign-up" : "Login"}
        </Button>
      </Form.Item>
    </Form>
  );
}
