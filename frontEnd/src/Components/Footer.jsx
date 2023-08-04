import { Typography } from "antd";

export default function Footer() {
  return (
    <div className="Footer flex justify-evenly items-center border-t border-slate-400/80 py-2 absolute inset-x-0 bottom-0 bg-[#FFFFFF]/40">
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