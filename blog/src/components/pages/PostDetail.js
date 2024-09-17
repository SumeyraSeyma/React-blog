import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

    useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/posts/${id}.json`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setPost(json);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    }
    });

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className='text-blue-200'>{post.title}</h1>
    </div>
  );
}

export default PostDetail;