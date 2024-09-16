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
      {data ? (
        <div>
          <h1>{data.title}</h1>
          <h2>{data.author}</h2>
          <hr />
          <div>
            {data.map((post, index) => (
              <div key={index}>
                {post.image && (
        <img className="mb-5 
        h-[400px] 
        w-full 
        rounded-xl 
        bg-no-repeat 
        object-cover 
        object-center 
        transition-transform 
        duration-200 
        ease-out 
        hover:scale-[1.02]" 
        src={post.image} 
        alt={post.title}  />
      )}
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Blog;
