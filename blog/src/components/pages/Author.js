import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Author() {
    const { authorName } = useParams();
    const [data, setData] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
          try {
            const response = await fetch('/blog.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const posts = await response.json();
            setData(posts);
            const filteredPosts = posts.filter(post => post.author === authorName);
            setPosts(filteredPosts);
          } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
          }
        }
    
        fetchPosts();
      }, [authorName]);
    
      return (
        <div className='mx-auto w-full max-w-3xl flex-col px-4 lg:px-0'>
            <Link to={`/posts/${data.id}`}>
                <img src={data.image} className="mb-5 h-[720px] w-full bg-no-repeat object-cover object-center" />
            </Link>
          <h1 className='my-4 text-4xl font-bold leading-tight tracking-tight text-zinc-700 dark:text-zinc-300'>Posts by {authorName} </h1>
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            ))
          ) : (
            <p>No posts found</p>
          )}
        </div>
      );
    }
    
    export default Author