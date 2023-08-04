import { Space } from "antd";
import SideBar from "./components/Sidebar";
import PageContent from "./components/PageContent";
export default function Sns() {
  return (
    <div className="app">
      <Space className="SideMenuAndMainContent">
          <SideBar />
        <PageContent />
      </Space>
    </div>
  );
}
