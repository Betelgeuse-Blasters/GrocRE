import { CoffeeOutlined, HomeOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();
  return (
    <div >
      <Menu
        mode="inline"
        onClick={(item) => {
          navigate(item.key);
        }}
        items={[
          {
            label: "Home",
            key: "/sns/home",
            icon: <HomeOutlined />,
          },
          {
            label: "Saved Meals",
            icon: <CoffeeOutlined />,
            children: [
              {
                key: "/sns/savedMeals",
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
            key: "/sns/savedMealPlans",
            // icon: <ExperimentOutlined />,
          },
        ]}
      />
    </div>
  );
}
