import { Typography } from "antd";
import "../styles/sns.css";
export default function Footer() {
  return (
    <div className="Footer">
      <Typography.Link href={"https://www.google.com"} target={"_blank"}>
        Privacy Policy
      </Typography.Link>
      <Typography.Link
        href={
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
        }
        target={"_blank"}
      >
        Jappetite industries™
      </Typography.Link>
      <Typography.Link href={"https://www.yahoo.com"} target={"_blank"}>
        Terms of use
      </Typography.Link>
    </div>
  );
}
