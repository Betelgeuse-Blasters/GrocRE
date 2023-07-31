import { Menu } from "antd";
import { Link } from "react-router-dom";

export default function NavBar() {
  const menuListItems = [
    {
      label: (
        <Link to="/">
          <img
            width={40}
            src="https://cdn.discordapp.com/attachments/1134186275109355592/1134644009181126666/IMG_0094.png"
          />
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
  ];

  return (
    <nav>
      <Menu mode="horizontal" items={menuListItems} />
    </nav>
  );
}
