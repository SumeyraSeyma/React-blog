import React, { useState, useEffect, Children } from 'react';
import './Blog.css';
import { throttle } from 'lodash';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import Header from '../Header';

function Blog({ searchTerm, selectedCategory }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchTerm, selectedCategory]);

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

  const filteredPosts = data
  ? data
      .filter((post) => {
        return (
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.article.some((article) =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      })
      .filter((post) =>
        selectedCategory === 'All' || post.category === selectedCategory // post.article yerine post.category
      )
  : [];


  return (
    <body>
    <div>
      {data && filteredPosts.map((post, index) => (
        <div key={index}>
          {post.image && (
            <div className="max-w-4xl mx-auto p-5">
              <Link to={`/posts/${post.id}`}>
            <img 
              src={post.image}
              className="mb-5 h-[400px] w-full rounded-xl bg-no-repeat object-cover object-center transition-transform duration-200 ease-out hover:scale-[1.02]"
            />
            </Link>
            <h1 className="text-3xl font-bold mt-4 mb-2">{post.title}</h1>
            <hr className="my-4" />
            <p className="text-zinc-500 md:space-y-0 text-start dark:text-zinc-400">{post.body}
            </p>
            <div className="flex items-center justify-between mt-8">
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
            <div>
            <Link to={`/posts/${post.id}`} className="text-indigo-200 hover:text-indigo-400 ">
                Continue Reading 
                <FontAwesomeIcon icon={faArrowRightLong} className='ml-1 mt-8 align-bottom' />
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
