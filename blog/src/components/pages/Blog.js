import React, { useState, useEffect, Children } from 'react';
import './Blog.css';
import { throttle } from 'lodash';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Blog() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/blog.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setData(json);
        setIsLoading(false);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        setIsLoading(false);
      }
    }
  
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsSpinning(window.scrollY > 100);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if(isLoading) {
    return <div>Loading...</div>
  }

  return (
    <body>
    
    <div>
      {data && data.map((post, index) => (
        <div key={index}>
          {post.image && (
            <div className="max-w-4xl mx-auto p-5">
            <img 
              src={post.image}
              className="mb-5 h-[400px] w-full rounded-xl bg-no-repeat object-cover object-center transition-transform duration-200 ease-out hover:scale-[1.02]"
            />
            <h1 className="text-3xl font-bold mt-4 mb-2">{post.title}</h1>
            <hr className="my-4" />
            <p className="text-zinc-500 md:space-y-0 text-start dark:text-zinc-400">{post.body}
            </p>
            <hr className="my-4" />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm">
                <img src={post.authorImage} alt="Author" className="h-10 w-10 rounded-full" />
                <span>by <span className="font-semibold text-indigo-200">{post.author}</span> on {post.date}</span>
              </div>
              <div className="flex flex-wrap">
                {post.article && post.article.map((article, idx) => (
                  <div key={idx} className="mr-4 flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900">
                    <span className="pt-[3px] text-xs uppercase leading-none text-indigo-600 dark:text-indigo-300 font-semibold">{article.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
            <Link to={`/posts/${post.id}`} className="text-indigo-200 hover:text-indigo-400 ">
                Continue Reading 
                <FontAwesomeIcon icon={faArrowRight} className='ml-1 mt-3' />
            </Link>
            </div>
          </div>
          )}
        </div>
      ))}
    </div>
    </body>
  );
}

export default Blog;
