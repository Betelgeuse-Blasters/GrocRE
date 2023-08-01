import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";

export default function LogoutButton() {
  const { logout } = useAuth0();
  const onClickFunc = () => logout();
  return <Button onClick={onClickFunc}>Logout</Button>;
}
