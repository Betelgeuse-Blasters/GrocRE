import { Typography } from "antd";

export default function Footer() {
  return (
    <div className="Footer w-full bg-[#FFFFFF]/40 py-2 border-t border-slate-400/80 flex justify-evenly items-center z-10">
      <Typography.Link href={"https://www.google.com"} target={"_blank"} className='text-lg'>
        Privacy Policy
      </Typography.Link>
      <Typography.Link
        href={
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
        }
        target={"_blank"} className='text-lg'
      >
        Jappetite industries™
      </Typography.Link>
      <Typography.Link href={"https://www.yahoo.com"} target={"_blank"} className='text-lg'>
        Terms of use
      </Typography.Link>
    </div>
  );
}