import {useEffect, useState} from 'react';
import MealCard from './MealCard.jsx';
import axios from 'axios';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/sns/posts').then((response) => {
      setPosts(response.data)
    })
  },[])
  // console.log('TEST TEST TEST ', posts[3].username)
  return (
    <div>
    {posts.map((post) => {
      return <MealCard key={post.id} post={post} />
    })}
    </div>
  );
}