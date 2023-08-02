import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
export default function NavBar() {
  const { isAuthenticated } = useAuth0();
  const menuListItems = [
    {
      label: (
        <Link to="/">
          <img width={100} src="/logo.png" />
        </Link>
      ),
      key: "home",
    },
    {
      label: <Link to="/ai">Ai</Link>,
      key: "ai",
    },
    {
      label: <Link to="/account">account</Link>,
      key: "account",
    },
    {
      label: <Link to="/mealplan">mealplan</Link>,
      key: "mealplan",
    },
    {
      label: <Link to="/sns/home">SNS</Link>,
      key: "sns",
    },
    {
      label: isAuthenticated ? <LogoutButton /> : <LoginButton />,
      key: "login/logout",
    },
  ];

  return (
    <nav>
      <Menu
        className="text-xl flex items-center"
        mode="horizontal"
        items={menuListItems}
      />
    </nav>
  );
}
