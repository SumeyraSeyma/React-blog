import React, { useState, useEffect, Children } from 'react';

function Blog() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedPostId, setExpandedPostId] = useState(null);
  

  useEffect(() => {
    fetch('/blog.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => {
        setData(json);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        setIsLoading(false);
      });
      console.log(data);
  }, []);

  const toggleExpandPost = (id) => {
    if (expandedPostId === id) {
      setExpandedPostId(null); 
    } else {
      setExpandedPostId(id); 
    }
  };

  if(isLoading) {
    return <div>Loading...</div>
  }

  return (
    <body>
    <header className='sticky top-0 z-10 mx-auto bg-white/75 backdrop-blur-lg dark:bg-zinc-950/75'>
      <div className='mx-auto flex w-full max-w-3xl flex-col items-center justify-between px-4 py-4 md:flex-row lg:px-0'>
      <h1 className='italic text-blue-400 text-3xl font-bold underline decoration-blue-50 hover:decoration-blue-50'>Our Blue Marble</h1>
      <span className="relative hidden text-lg tracking-wide text-zinc-500 dark:text-zinc-200 md:flex">Thoughts and images from our amazing planet.</span>
    </div>
    </header>
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
            {expandedPostId === post.id ? post.body : `${post.body.substring(0, 100)}...`}
            </p>
            <button onClick={() => toggleExpandPost(post.id)} className="text-cyan-200 hover:text-cyan-400">
            {expandedPostId === post.id ? 'Show Less' : 'Show More'}
            </button>
            <hr className="my-4" />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm">
                <img src={post.authorImage} alt="Author" className="h-10 w-10 rounded-full" />
                <span>by <span className="font-semibold text-cyan-200">{post.author}</span> on {post.date}</span>
              </div>
              <div className="flex flex-wrap">
                {post.article && post.article.map((article, idx) => (
                  <div key={idx} className="mr-4">
                    <span className="text-base font-bold">{article.title}</span>
                  </div>
                ))}
              </div>
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
