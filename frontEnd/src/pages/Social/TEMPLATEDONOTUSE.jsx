import { Menu, Space, Typography } from "antd";
import { CoffeeOutlined, HomeOutlined } from "@ant-design/icons";
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
        mode="inline"
        items={[
          {
            label: "Home",
            key: "home",
            icon: <HomeOutlined />,
          },
          {
            label: "Saved Meals",
            key: "following",
            icon: <CoffeeOutlined />,
            children: [
              {
                key: 1,
                label: "test1",
              },
              {
                key: 2,
                label: "test2",
              },
              {
                key: 3,
                label: "test3",
              },
            ],
          },
          {
            label: "Saved Meal Plans",
            key: "savedMealPlans",
            // icon: <ExperimentOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}

function PageContent() {
  return <div className="PageContent">page content</div>;
}
function Footer() {
  return (
    <div className="Footer">
      <Typography.Link href={"https://www.google.com"} target={"_blank"}>
        Privacy Policy
      </Typography.Link>
      <Typography.Link href={"https://www.crunchyroll.com"} target={"_blank"}>
        Jappetite industries™
      </Typography.Link>
      <Typography.Link href={"https://www.yahoo.com"} target={"_blank"}>
        Terms of use
      </Typography.Link>
    </div>
  );
}
function ExplorePage() {
  return <div> explore page</div>;
}
