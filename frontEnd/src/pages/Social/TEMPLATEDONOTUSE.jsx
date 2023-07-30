import { Menu, Space, Typography } from "antd";
import {
  HomeOutlined,
  SearchOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./styles/sns.css";
import NavBar from "../../NavBar";
export default function AppTEMP() {
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

function SideBar() {
  return (
    <div className="SideBar">
      <Menu
        items={[
          {
            label: "Home",
            key: "home",
            icon: <HomeOutlined />,
          },
          {
            label: "Explore",
            key: "explore",
            icon: <SearchOutlined />,
          },
          {
            label: "Following",
            key: "following",
            icon: <TeamOutlined />,
          },
          {
            label: "Profile",
            key: "profile",
            icon: <UserOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}

function PageContent() {
  return (
    <div className="PageContent">
      <p>page content</p>
    </div>
  );
}
function Footer() {
  return (
    <div className="Footer">
      <Typography.Link href={"https://www.google.com"} target={"_blank"}>
        Privacy Policy
      </Typography.Link>
      <Typography.Link href={"https://www.yahoo.com"} target={"_blank"}>
        Terms of use
      </Typography.Link>
    </div>
  );
}
