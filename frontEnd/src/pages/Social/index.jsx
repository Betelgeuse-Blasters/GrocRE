import { Space } from "antd";
import NavBar from "../../NavBar";
import SideBar from "./components/Sidebar";
import PageContent from "./components/PageContent";
import Footer from "./components/Footer";
export default function Sns() {
  return (
    <div className="app">
      <NavBar />
      <Space className="SideMenuAndMainContent">
        <SideBar />
        <PageContent />
      </Space>
      <Footer />
    </div>
  );
}
