import {useEffect, useState} from 'react';
import MealCard from './MealCard.jsx';
import axios from 'axios';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/sns/posts').then((response) => {
      response.data.forEach((post) => {
        axios.get(`http://localhost:3000/sns/post?userid=${post.createdBy}&mealid=${post.mealId}`).then((res) => {
          post.username = res.data.username
          post.meal = res.data.meal
          setPosts(response.data)
        })
      })
    })
  },[])
  console.log('final posts ', posts)
  return (
    <div>
    {posts.map((post) => {
      return <MealCard key={post.id} post={post} />
    })}
    </div>
  );
}