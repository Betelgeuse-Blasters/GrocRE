import { Card, Carousel, Image, Typography } from "antd";
import { Cheesieburger } from "./MealCard";
export default function MealPlanCard() {
  const example = {
    id: 1,
    title: "Delicious Tots",
    summary: "This is a list of tater tot recipes that I made",
    createdBy: { id: 1, nickName: "user1" },
    createdAt: Date.now(),
    mealPlanId: 1,
    type: false,
    likes: [
      {
        id: 1,
        userId: 2,
        isLike: true,
      },
      {
        id: 1,
        userId: 3,
        isLike: false,
      },
      {
        id: 1,
        userId: 4,
        isLike: true,
      },
      {
        id: 1,
        userId: 2,
        isLike: true,
      },
    ],
    photos: [
      {
        id: 1,
        url: "https://cdn.discordapp.com/attachments/1134186275109355592/1136683233401114644/image.png",
        altText: "TaterTots",
      },
    ],
    comments: [
      {
        id: 1,
        content: "gnmsiafgdsapfdspafnsdpaifndsipafndsafsdafdsafdsa",
        User: {
          id: 1,
          nickName: "user1",
        },
      },
    ],
    mealPlan: {
      id: 1,
      name: "Tasty Tots",
      description: "fgbnequietnguiloqwenugiqw;egn;qwegwe",
      user: {
        id: 1,
        nickName: "user1",
      },
    },
  };

  const mapCoverPhotos = (photos) => {
    return photos.map((photo) => {
      return (
        <div key={photo.id}>
          <Image src={photo.url} alt={photo.altText} fallback={Cheesieburger} />
        </div>
      );
    });
  };

  return (
    <Card
      style={{ width: 600, margin: "15px" }}
      cover={
        <Carousel>{mapCoverPhotos(example.photos) || Cheesieburger}</Carousel>
      }
      key={example.id}
    >
      <Typography.Title level={3}>{example.title}</Typography.Title>
      <Typography.Paragraph>{example.summary}</Typography.Paragraph>
    </Card>
  );
}
