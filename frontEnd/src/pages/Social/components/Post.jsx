import { Card, Avatar, Collapse, message, List } from 'antd';
import { LikeOutlined, DislikeOutlined, CommentOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import {useState} from 'react';
const {Meta} = Card;

export default function Post() {
  const mealTitle = 'Cheesieburger';
  const username = 'username';
  const postTitle = `${mealTitle} by ${username}`;
  const [heartColor, setHeartColor] = useState('white');
  const [color, setColor] = useState('grey');
  const [saved, setSaved] = useState(false);

  const messageTime = 2.5;
  const Cheesieburger = 'https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg'

  function savePost() {
    if (!saved) {
      message.success(`${mealTitle} added to Saved Meals`, messageTime);
    } else {
      message.success(`${mealTitle} removed from Saved Meals`, messageTime);
    }
    setSaved(!saved);
  }
  function like(like) {
    if (like) {
      message.info(`${mealTitle} liked!`, messageTime)
    } else {
      message.info(`${mealTitle} disliked!`, messageTime)
    }
  }

 function onHover(hover, target) {
  if (hover) {
    if (target === 'like') {
      setColor('#1677ff')
    } else {
      setHeartColor('red')
    }
  } else {
    setColor('grey');
    setHeartColor('white');
  }
 }

  return (
    <div>
      <Card
        style={{width:600, margin: '15px'}}
        cover={
          <img alt = 'example' src={Cheesieburger}/>
        }
        actions={[
          <LikeOutlined onClick={()=>{like(1)}} key='like'/>,
          <DislikeOutlined  onClick={()=>{like(0)}} key='dislike'/>,
          <Collapse
            key='collapse'
            bordered={false}
            style={{backgroundColor:"white"}}
            items={[
             {
              key: '1',
              onMouseEnter: () => {onHover(true, 'like')},
              onMouseLeave: () => {onHover(false, 'like')},
              label: <CommentOutlined style={{color: color, position: 'absolute', top: '15%' }} />,
              showArrow: false,
              children: <List
              style={{width:'300%', right: "220%", backgroundColor: 'white'}}
              itemLayout='horizontal'
              bordered
              dataSource={[
                {
                  username: 'Test User One',
                  comment: 'test comment one'
                },
                {
                  username: 'Test User Two',
                  comment: 'test comment two'
                }
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar= {<Avatar src={Cheesieburger}/>}
                    title={<a style={{position:'relative', right:'38%'}}>{item.username}</a>}
                    description={<a style={{position: 'relative', right: '35%'}}>{item.comment}</a>}
                  />
                </List.Item>
              )}
              />
              }
            ]}
          />
        ]}
        hoverable
        >
        <Meta
          avatar={<Avatar src={Cheesieburger} />}
          title={postTitle}
          description='A Royale with Cheese'
        />
        {!saved ?
          <HeartOutlined
            onMouseEnter={() => {onHover(true, 'heart')}}
            onMouseLeave={() => {onHover(false, 'heart')}}
            onClick={savePost}
            style={{color: heartColor, position: 'absolute', top:'10px', right: '15px', fontSize: '20px'}}
            />
          :
          <HeartFilled
            onMouseEnter={() => {onHover(true, 'heart')}}
            onMouseLeave={() => {onHover(false, 'heart')}}
            onClick={savePost}
            style={{color: heartColor, position: 'absolute', top:'10px', right: '15px', fontSize: '20px'}}
          />
          }

        <Collapse items={[
          {
            key: '1',
            label: 'Nutritional Info',
            children: <p>Some info that is very nutritious</p>
          },
          {
            key: '2',
            label: 'Ingredients',
            children: <p>Definitely not random pieces of food from the trash</p>
          },
          {
            key: '3',
            label: 'Recipe/Steps',
            children: <p>Get food, add fire, ?, profit</p>
          }
        ]}
        bordered={false}
        style={{backgroundColor:"white", paddingTop:'10px'}}
        />
      </Card>
    </div>
  )
}