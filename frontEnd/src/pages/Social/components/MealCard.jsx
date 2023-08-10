import { Card, Avatar, Collapse, message, List, Image } from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  CommentOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import VirtualList from "rc-virtual-list";
import API from '../../../Helper/API.js';
import axios from 'axios';
import NutritionFacts from '../../AI/NutritionFacts.jsx';

const { Meta } = Card;
export const Cheesieburger =
  "https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg";

export default function MealCard({isSavedMeal, user, post, setMeals }) {
  const postTitle = `${post.title} by ${post.username}`;
  const [heartColor, setHeartColor] = useState("white");
  const [color, setColor] = useState("grey");
  const [likeColor, setLikeColor] = useState("grey");
  const [dislikeColor, setDislikeColor] = useState("grey");
  const [comments, setComments] = useState([]);
  const [nutrition, setNutrition] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [saved, setSaved] = useState(false);
  const heartProps = {
    onMouseEnter: () => {
      onHover(true, "heart");
    },
    onMouseLeave: () => {
      onHover(false, "heart");
    },
    onClick: savePost,
    style: {
      color: heartColor,
      position: "absolute",
      top: "10px",
      right: "15px",
      fontSize: "20px",
    },
  };
  const messageTime = 2.5;


  const containerHeight = 400;
  console.log(post.title, saved, post.mealId)
  useEffect(() => {
    setSaved(false);
    appendData();
    for (let item in post.meal.nutritionFacts) {
      setNutrition((nutrition) => [
        ...nutrition,
        `${item}: ${post.meal.nutritionFacts[item]}`,
      ]);
    }
    for (let item of post.meal.ingredients) {
      setIngredients((ingredients) => [
        ...ingredients,
        `${item[0]} ${item[1]} of ${item[2]}`,
      ]);
    }
    for (let step of post.meal.recipeSteps) {
      setSteps((steps) => [...steps, step]);
    }
    API.GET_SNS_LIKES(post.id)
      .then((response) => {
        setLikes(response.data.likes);
        setDislikes(response.data.dislikes);
      });
      API.GET_SNS_SAVE(post.mealId).then((response) => {
        console.log(post.mealId + ' response data: ', response.data)
        if (typeof response.data === 'object') {
          console.log(post.mealId, post.title, ' setting to true')
          setSaved(true);
        }
      })
  }, []);

  useEffect(() => {
    if (likes.length === 0) {
      setUserLiked(false)
      setLikeColor('grey')
    } else if (dislikes.length === 0) {
      setUserDisliked(false)
      setDislikeColor("grey")
    }
    for (let i = 0; i < likes.length; i++) {
      if (likes[i].userId === user.id) {
        setUserLiked(true)
        setLikeColor('#1677ff')
        break;
      }
      setUserLiked(false)
      setLikeColor("grey")
    }
    for (let i = 0; i < dislikes.length; i++) {
      if (dislikes[i].userId === user.id) {
        setUserDisliked(true)
        setDislikeColor("#1677ff")
        break;
      }
      setUserDisliked(false)
      setDislikeColor("grey")
    }

  },[likes, dislikes])

  let action;
  if (isSavedMeal) {
    action = null;
  } else {
    action = [
      <div
        key="like"
        onClick={() => {
          like(1);
        }}
        style={{color: likeColor}}
      >
        <LikeOutlined  />
        <p>{likes.length}</p>
      </div>,
      <div
        key="dislike"
        onClick={() => {
          like(0);
        }}
        style={{color: dislikeColor}}
      >
        <DislikeOutlined  />
        <p>{dislikes.length}</p>
      </div>,
      <Collapse
        key="collapse"
        bordered={false}
        style={{ backgroundColor: "white" }}
        items={[
          {
            key: "1",
            onMouseEnter: () => {
              onHover(true, "like");
            },
            onMouseLeave: () => {
              onHover(false, "like");
            },
            label: (
              <CommentOutlined
                style={{ color: color, position: "absolute", top: "15%" }}
              />
            ),
            showArrow: false,
            children: (
              <List>
                <VirtualList
                  style={{
                    width: "300%",
                    right: "220%",
                    backgroundColor: "white",
                  }}
                  itemlayout="horizontal"
                  bordered="true"
                  data={comments}
                  height={containerHeight}
                  onScroll={onScroll}
                >
                  {(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={Cheesieburger} />}
                        title={
                          <a style={{ position: "relative", right: "38%" }}>
                            {item.username}
                          </a>
                        }
                        description={
                          <p
                            style={{
                              position: "relative",
                              right: "10%",
                              textAlign: "left",
                            }}
                          >
                            {item.comment}
                          </p>
                        }
                      />
                    </List.Item>
                  )}
                </VirtualList>
              </List>
            ),
          },
        ]}
      />,
    ];
  }



  function appendData() {
    let newComments = [];
    for (let i = 0; i < 5; i++) {
      let username = faker.internet.userName();
      let comment = faker.word.words({ count: { max: 144 } });
      newComments.push({ username: username, comment: comment });
    }
    setComments(comments.concat(newComments));
  }

  function onScroll(e) {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      containerHeight
    ) {
      appendData();
    }
  }

  function savePost() {
    if (!saved) {
      axios.put(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_PORT}/sns/save?&recipeid=${post.mealId}`, {withCredentials: true}).then(() => {
        message.success(`${post.title} added to Saved Meals`, messageTime);
        setSaved(!saved);
      }).then(() => {
        API.GET_SNS_MEALS().then((response) => {
          setMeals(response.data);
        })
      })
    } else {
      axios.delete(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_PORT}/sns/save?&recipeid=${post.mealId}`, {withCredentials: true}).then(() => {
        message.success(`${post.title} removed from Saved Meals`, messageTime);
        setSaved(!saved);
      }).then(() => {
        API.GET_SNS_MEALS().then((response) => {
          setMeals(response.data);
        })
      })
    }

  }
  function like(like) {
    if (like) {
      axios
        .put(
          `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_PORT}/sns/likes?postid=${
            post.id
          }&userid=${user.id}&like=true`, {withCredentials: true}
        )
        .then(() => {

          axios
            .get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_PORT}/sns/likes?postid=${post.id}`, {withCredentials: true})
            .then((response) => {
              setLikes(response.data.likes);
              setDislikes(response.data.dislikes);
              if (!userLiked) {
                message.info(`${post.title} liked!`, messageTime);
              }
            });
        });
    } else {
      axios
        .put(
          `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_PORT}/sns/likes?postid=${
            post.id
          }&userid=${user.id}&like=false`, {withCredentials: true}
        )
        .then(() => {

          axios
            .get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_PORT}/sns/likes?postid=${post.id}`, {withCredentials: true})
            .then((response) => {
              setLikes(response.data.likes);
              setDislikes(response.data.dislikes);
              if (!userDisliked) {
                message.info(`${post.title} disliked!`, messageTime);
              }
            });
        });
    }
  }

  function onHover(hover, target) {
    if (hover) {
      if (target === "like") {
        setColor("#1677ff");
      } else {
        setHeartColor("red");
      }
    } else {
      setColor("grey");
      setHeartColor("white");
    }
  }


  //format nutritional info

  return (
    <div>
      <Card
        style={{ minHeight: 575, width: 400,  margin: "15px" }}
        cover={<Image style={{height: 250}} fallback={Cheesieburger} />}
        actions={action}
        hoverable
      >
        <Meta
          avatar={<Avatar src={Cheesieburger} />}
          title={postTitle}
          description={post.summary}
        />
        {!saved ? (
          <HeartOutlined {...heartProps} />
        ) : (
          <HeartFilled {...heartProps} />
        )}

        <Collapse
          size='small'
          items={[
            {
              key: "1",
              label: "Nutritional Info",
              children: (
                <NutritionFacts style={{height: '50%', width: '50%'}} meal={post.meal}/>
              ),
            },
            {
              key: "2",
              label: "Ingredients",
              children: (
                <List
                size='small'
                dataSource={ingredients}
                  split={false}
                  renderItem={(item) => (
                    <List.Item>
                      <p>{item}</p>
                    </List.Item>
                  )}
                ></List>
              ),
            },
            {
              key: "3",
              label: "Recipe/Steps",
              children: (
                <List
                  size='small'
                  dataSource={steps}
                  split={false}
                  renderItem={(item) => (
                    <List.Item>
                      <p>{item}</p>
                    </List.Item>
                  )}
                ></List>
              ),
            },
          ]}
          bordered={false}
          style={{ backgroundColor: "white", paddingTop: "10px" }}
        />
      </Card>
    </div>
  );
}
