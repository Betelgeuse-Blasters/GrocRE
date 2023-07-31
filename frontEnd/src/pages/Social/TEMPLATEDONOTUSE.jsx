import { Menu, Space, Typography, Card, Avatar, Collapse, message, Button } from "antd";
import { CoffeeOutlined, HomeOutlined, LikeOutlined, DislikeOutlined, CommentOutlined, HeartOutlined } from "@ant-design/icons";
import "./styles/sns.css";
import NavBar from "../../NavBar";
import Post from './components/Post.jsx';
const {Meta} = Card;
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
function savePost() {
  message.success(`${mealTitle} added to Saved Meals`, messageTime)
}
function like(like) {
  if (like) {
    message.info(`${mealTitle} liked!`, messageTime)
  } else {
    message.info(`${mealTitle} disliked!`, messageTime)
  }
}

const mealTitle = 'Cheesieburger';
const username = 'username';
const postTitle = `${mealTitle} by ${username}`;
const messageTime = 2.5;

function PageContent() {
  return <Post />;
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
