import { Menu } from "antd";
import { Link } from "react-router-dom";
import {useContext} from 'react';
import UserContext from './Context/User.js';

export default function NavBar() {
  const [user, setUser] = useContext(UserContext);
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
      label: user.loggedIn ? <Link to="/account">account</Link> : <Link to="/account">Registration</Link>,
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
