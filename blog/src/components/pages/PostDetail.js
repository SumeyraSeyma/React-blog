import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

function PostDetail() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const [suggestedPosts, setSuggestedPosts] = useState([]);
  const [titLimit, setTitLimit] = useState(36);
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  

  const truncateText = (text, limit) => {
    if (text && text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/posts/${id}.json`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    }
  
    fetchData();
  }, [id]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


  useEffect(() => {
    async function fetchSuggestedPosts() {
      try {
        const response = await fetch('/blog.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        const currentId = parseInt(id);
        const posts = json.filter((post) => post.id !== currentId);
        shuffleArray(posts);
        const limitedPosts = posts.slice(0, 2);
        setSuggestedPosts(limitedPosts);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    }
  
    fetchSuggestedPosts();
  }, [id]);

  return (
    <div>
      {
        data && data.map((post, index) => (
          <div key={index}>
            <img
              src={post.image}
              className="mb-5 h-[720px] w-full bg-no-repeat object-cover object-center"
            />
            <div className="max-w-4xl mx-auto p-5">
              <div className='flex'>
                <Link to={"/"}>
                <FontAwesomeIcon icon={faArrowLeftLong} className='mr-4 flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900' />
                </Link>
                <h1 className="text-3xl mb-2 font-bold text-start">{post.title}</h1>
              </div>
              <div className="flex items-center justify-between mt-4">
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
              <hr className="my-4" />
              <p className="text-zinc-500 md:space-y-0 text-start dark:text-zinc-400">{post.body}</p>
            </div>
            {post.detail && post.detail.map((detail, index) => (
              <div key={index} className="max-w-4xl mx-auto pl-5 pr-5">
                <h2 className="text-xl font-bold mt-4 mb-2">{detail.title}</h2>
                <div className="text-zinc-500 md:space-y-0 text-start dark:text-zinc-400">
                  {detail.body.split("\n\n").map((paragraph, pIndex) => (
                    <p style={{ marginBottom: '16px' }} key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))  
            }
            <div className='max-w-4xl mx-auto p-5'>
              <hr className="my-6" />
              <h2 className="text-xl font-bold mt-4 mb-4">Suggested Posts</h2>
              <div className="flex flex-wrap">
                {suggestedPosts.map((post, index) => (
                  <div key={index} className="mr-4 mb-4">
                    <Link to={`/posts/${post.id}`}>
                      <img 
                        src={post.image}
                        className="h-[200px] w-[200px] rounded-xl bg-no-repeat object-cover object-center transition-transform duration-200 ease-out hover:scale-[1.02]"
                      />
                    </Link>
                    <h3 className="text-lg font-semibold mt-2">{truncateText(post.title, titLimit)}</h3>
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default PostDetail;