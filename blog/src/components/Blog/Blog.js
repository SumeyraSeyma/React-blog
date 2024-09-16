import React, { useState, useEffect } from 'react';

function Blog() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/blog.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => setData(json))
      .catch(error => console.error('Error fetching data:', error));
      console.log(data);
  }, []);

  return (
    <div>
      {data && data.map((post, index) => (
        <div key={index}>
          {post.image && (
            <div className="max-w-4xl mx-auto p-5">
            <img 
              src={post.image} 
              alt="Earth from Space"
              className="mb-5 h-[400px] w-full rounded-xl bg-no-repeat object-cover object-center transition-transform duration-200 ease-out hover:scale-[1.02]"
            />
            <h1 className="text-3xl font-bold mt-4 mb-2">{post.title}</h1>
            <p className="rgb(161 161 170/var(--tw-text-opacity)) text-sm">
              by <span className="font-semibold text-cyan-200">{post.author}</span> on {post.date}
            </p>
            <hr className="my-4" />
            <p className="text-zinc-500 md:space-y-0 text-start dark:text-zinc-400">{post.body}</p>
          </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Blog;
