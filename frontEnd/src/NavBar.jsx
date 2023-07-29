import { Menu } from "antd";
import { Link } from "react-router-dom";

export default function NavBar() {
  const menuListItems = [
    {
      label: <Link to="/">Home</Link>,
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
      label: <Link to="/sns">SNS</Link>,
      key: "sns",
    },
  ];

  return (
    <nav>
      <Menu mode="horizontal" items={menuListItems} />
    </nav>
  );
}
