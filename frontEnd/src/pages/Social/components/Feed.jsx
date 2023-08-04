import {useEffect, useState} from 'react';
import MealCard from './MealCard.jsx';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Divider, List, Skeleton } from 'antd';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(true)
  useEffect(() => {
    loadMorePosts();
  },[])

  function loadMorePosts() {
    if (loading) {
      return
    }
    axios.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_PORT}/sns/posts?count=${posts.length}`, {withCredentials: true}).then((response) => {
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
      scrollableTarget="scrollableDiv"
    >
      <List
        dataSource={posts}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <MealCard post={item}/>
          </List.Item>
        )}
      >
      </List>
    </InfiniteScroll>
  );
}