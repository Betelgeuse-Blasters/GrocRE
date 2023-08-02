import { Menu } from "antd";
import { Link } from "react-router-dom";
import LoginButton from "./Components/LoginButton";

export default function NavBar() {
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
      label: <LoginButton />,
      key: "login",
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
