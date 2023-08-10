import {useEffect, useState, useContext} from 'react';
import MealCard from './MealCard.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import {  Divider, List, Skeleton } from 'antd';
import UserContext from '../../../Context/User.js';
import API from '../../../Helper/API.js';

export default function Feed({setMeals}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(true)
  const [user, setUser] = useContext(UserContext);
  useEffect(() => {
    loadMorePosts();
  },[])

  function loadMorePosts() {
    if (loading) {
      return
    }

    API.GET_SNS(posts.length).then((response) => {
      if (!response.data.length) {
        setDone(false)
      } else {
        setPosts(posts.concat(response.data))
      }
    }).catch((err) => {
      console.log('loading error', err)
      setLoading(false);
    })
  }

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={loadMorePosts}
      hasMore={done}
      loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
      endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
      height={1100}
      scrollableTarget="scrollableDiv"
    >
      <List
        style={{overflowX: 'hidden'}}
        grid={{
          gutter: 16,
          column: 3,
        }}
        dataSource={posts}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <MealCard isSavedMeal={false} user={user} post={item} setMeals={setMeals}/>
          </List.Item>
        )}
      >
      </List>
    </InfiniteScroll>
  );
}