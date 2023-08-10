import { Menu, Modal } from "antd";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useState, useContext } from "react";
import LoginModal from "./LoginModal";
import UserContext from "../Context/User.js"


export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useContext(UserContext)
  const logout = () => {
    setUser({loggedIn: false});
    document.cookie = "session= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
  };

  const showModal = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };
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
      label: <Link to="/create_recipe">Create Recipe</Link>,
      key: "ai",
    },
    // {
    //   label: <Link to="/account">Account</Link>,
    //   key: "account",
    // },
    {
      label: <Link to="/3DMeal">3DMeals</Link>,
      key: "mealplan",
    },
    {
      label: <Link to="/Feed/home">Feed</Link>,
      key: "sns",
    },
    {
      label: user.loggedIn ? <LogoutButton logout={logout}/> : <LoginButton onClick={showModal} />,
      key: "login",
    }

  ];
  const handleLogin = () => {

    setIsOpen(false);
  };


  return (
    <nav>
      <Menu
        className="text-xl flex items-center"
        mode="horizontal"
        items={menuListItems}
      />
      <Modal title="Login" open={isOpen} onCancel={handleCancel} footer={null} >
        <LoginModal handleLogin={handleLogin}></LoginModal>
      </Modal>
    </nav>
  );
}
