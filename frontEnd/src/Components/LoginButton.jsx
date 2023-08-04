import { Button } from "antd";

const LoginButton = ({ onClick }) => {
  return <Button className='text-lg flex items-center' onClick={onClick}>Login</Button>;
}

export default LoginButton;
