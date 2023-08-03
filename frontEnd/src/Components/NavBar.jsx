import { Menu, Modal } from "antd";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useState } from "react";
import LoginModal from "./LoginModal";



export default function NavBar() {
  const [login, setLogin] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    setLogin(false);
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
      label: login ? <LogoutButton logout={logout}/> : <LoginButton onClick={showModal} />,
      key: "login",
    },
  ];
  const handleLogin = () => {
    setLogin(true);
    setIsOpen(false);
  };


  return (
    <nav>
      <Menu
        className="text-xl flex items-center"
        mode="horizontal"
        items={menuListItems}
      />
      <Modal title="Login" open={isOpen} onCancel={handleCancel} >
        <LoginModal handleLogin={handleLogin}></LoginModal>
      </Modal>
    </nav>
  );
}
