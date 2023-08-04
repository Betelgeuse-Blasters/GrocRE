import { Typography } from "antd";

export default function Footer() {
  return (
    <div className="Footer fixed bottom-0 left-0 w-full bg-[#FFFFFF]/40 py-2 border-t border-slate-400/80 flex justify-evenly items-center z-10">
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