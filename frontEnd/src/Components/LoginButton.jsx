import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";

export default function LoginButton() {
  const { loginWithPopup } = useAuth0();
  const onClickFunc = () => loginWithPopup();
  return <Button onClick={onClickFunc}>Login</Button>;
}
