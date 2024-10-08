import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

function Author() {
    const { authorName } = useParams();
    const [data, setData] = useState(null);
    const [posts, setPosts] = useState([]);

    let navigate = useNavigate();
    
    const handleGoBack =() => {
      navigate(-1);
    }
    

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
          <div className='flex items-center space-x-4'>
                <button onClick={handleGoBack} className='flex items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 transition duration-300 ease-in-out'>
                  <FontAwesomeIcon icon={faArrowLeftLong} className='text-white' />
                    </button>
                    <h1 className="text-3xl font-bold text-white">{posts.title}</h1>
              </div>
          <div className="flex items-center space-x-4 mb-8">
            <img src={posts[0]?.authorImage} alt="Author" className="h-20 w-20 rounded-full" />
            <div>
              <h1 className="text-3xl font-bold">{authorName}</h1>
              <p className="text-zinc-500 dark:text-zinc-400">{posts[0]?.authorBio}</p>
            </div>
          </div>
          <h1 className='my-4 text-4xl font-bold leading-tight tracking-tight text-zinc-700 dark:text-zinc-300'>Posts by {authorName} </h1>
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index}>
                <Link to={`/posts/${post.id}`}>
                    <img
                        src={post.image}
                        className="mb-5 h-[400px] w-full rounded-xl bg-no-repeat object-cover object-center transition-transform duration-200 ease-out hover:scale-[1.02]"
                    />
                </Link>
                <h1 className="text-3xl font-bold mt-4 mb-2">{post.title}</h1>
                <hr className="my-4" />
                <p className="text-zinc-500 md:space-y-0 text-start dark:text-zinc-400">{post.body}</p>
                <div className="flex items-center justify-between mt-8 mb-8">
              <div className="flex items-center space-x-2 text-sm">
                <Link to={`/authors/${post.author}`}>
                <img src={post.authorImage} alt="Author" className="h-10 w-10 rounded-full" />
                </Link>
                
                <span>
                <Link to={`/authors/${post.author}`}>
                  by <span className="font-semibold text-indigo-200">{post.author} </span>
                </Link>
                 on {post.date}</span>
              </div>
              <div className="flex flex-wrap">
                {post.article && post.article.map((article, idx) => (
                  <div key={idx} className="mr-4 flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900">
                    <span className="pt-[3px] text-xs uppercase leading-none text-indigo-600 dark:text-indigo-300 font-semibold">{article.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className='mb-4'>
            <Link to={`/posts/${post.id}`} className="text-indigo-200 hover:text-indigo-400 ">
                Continue Reading 
                <FontAwesomeIcon icon={faArrowRightLong} className='ml-1 align-bottom' />
            </Link>
            </div>
                </div>
                ))
          ) : (
            <p>No posts found</p>
          )}
        </div>
      );
    }
    
    export default Author