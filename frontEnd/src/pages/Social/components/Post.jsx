import { Card, Avatar, Collapse, message, Button, List } from 'antd';
import { LikeOutlined, DislikeOutlined, CommentOutlined, HeartOutlined } from "@ant-design/icons";
import {useState} from 'react';
const {Meta} = Card;

export default function Post() {
  const mealTitle = 'Cheesieburger';
  const username = 'username';
  const postTitle = `${mealTitle} by ${username}`;
  const [commentsOpen, setCommentsOpen] = useState(false)
  const messageTime = 2.5;
  const Cheesieburger = 'https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg'

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

  function openComment() {
    setCommentsOpen(!commentsOpen);
  }
  const comments = [{
    username: 'Test User One',
    comment: 'test comment one'
  },
  {
    username: 'Test User Two',
    comment: 'test comment two'
  }]

  return (
    <div>
      <Card
        style={{width:600}}
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
            showArrow={false}
            items={[
             {
              key: '1',
              label: <CommentOutlined key='comments'/>,
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
                    title={<p>{item.username}</p>}
                    description={item.comment}
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
        <Button onClick={savePost} type='primary' icon={<HeartOutlined />} style={{position: 'absolute', top:'1%', right: '2%'}} />
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
          },
          {
            key: '4',
            label: 'Comments',
            children: <p>This heckin sick bro</p>
          }
        ]}
        bordered={false}
        style={{backgroundColor:"white", paddingTop:'10px'}}
        />
      </Card>
      {commentsOpen &&
        <List
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
              title={<p>{item.username}</p>}
              description={item.comment}
            />
          </List.Item>
        )}
        />
      }
    </div>
  )
}