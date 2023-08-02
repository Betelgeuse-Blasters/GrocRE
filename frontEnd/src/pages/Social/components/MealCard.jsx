import { Card, Avatar, Collapse, message, List } from 'antd';
import { LikeOutlined, DislikeOutlined, CommentOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import {useState, useEffect} from 'react';
import { faker } from '@faker-js/faker';
import VirtualList from 'rc-virtual-list';
const {Meta} = Card;

export default function MealCard({isSavedMeal}) {
  const mealTitle = 'Cheesieburger';
  const username = 'username';
  const postTitle = `${mealTitle} by ${username}`;
  const [heartColor, setHeartColor] = useState('white');
  const [color, setColor] = useState('grey');
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState([]);
  const heartProps = {
    onMouseEnter: () => {onHover(true, 'heart')},
    onMouseLeave: () => {onHover(false, 'heart')},
    onClick: savePost,
    style: {color: heartColor, position: 'absolute', top:'10px', right: '15px', fontSize: '20px'}
  }
  const messageTime = 2.5;
  const Cheesieburger = 'https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg'

  const containerHeight = 400;
  let action;
  if (isSavedMeal) {
    action = null
  } else {
    action = [
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
          children:
            <List>
              <VirtualList
                style={{width:'300%', right: "220%", backgroundColor: 'white'}}
                itemlayout='horizontal'
                bordered='true'
                data={comments}
                height={containerHeight}
                onScroll={(onScroll)}
              >
            {(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar= {<Avatar src={Cheesieburger}/>}
                  title={<a style={{position:'relative', right:'38%'}}>{item.username}</a>}
                  description={<p style={{position: 'relative', right: '10%', textAlign: 'left'}}>{item.comment}</p>}
                />
              </List.Item>
            )}
          </VirtualList>
          </List>
          }
        ]}
      />
    ]
  }

  useEffect(() => {
    appendData();
  }, []);

  function appendData() {
    let newComments = [];
    for (let i = 0; i < 5; i++) {
      let username = faker.internet.userName();
      let comment = faker.word.words({count: {max: 144}});
      newComments.push({'username': username, 'comment': comment})
    }
    setComments(comments.concat(newComments));
  }

  function onScroll(e) {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === containerHeight) {
      appendData();
    }
  }

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
        actions={action}
        hoverable
        >
        <Meta
          avatar={<Avatar src={Cheesieburger} />}
          title={postTitle}
          description='A Royale with Cheese'
        />
        {!saved ? <HeartOutlined {...heartProps}/> : <HeartFilled {...heartProps} /> }

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