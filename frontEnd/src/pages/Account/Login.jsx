import { Avatar, Typography } from "antd";
import NavBar from "../../Components/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
export default function Login() {
  const { user, isAuthenticated } = useAuth0();
  // const formatDate = (dateString) => {
  //   const options = { year: "numeric", month: "long", day: "numeric" };
  //   const formattedDate = new Date(dateString).toLocaleDateString(
  //     undefined,
  //     options
  //   );
  //   return formattedDate;
  // };
  return (
    isAuthenticated && (
      <div>
        <NavBar />

        <Avatar
          size={150}
          shape="square"
          src={user?.picture || "../../../public/meatball.png"}
        />
        <Typography.Title>User Name: {user.nickname}</Typography.Title>
        <Typography.Title level={3}>Email: {user.email}</Typography.Title>
        <Typography.Title level={3}></Typography.Title>
        {Object.keys(user).map((key, i) => {
          return (
            <Typography.Paragraph key={i}>
              {key} : {user[key]}
            </Typography.Paragraph>
          );
        })}

        <br />
        {/* {JSON.stringify(user)} */}
      </div>
    )
  );
}
