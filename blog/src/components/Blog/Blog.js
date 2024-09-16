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
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <h1 className="text-3xl font-bold mt-4 mb-2">{post.title}</h1>
            <p className="text-gray-600 text-sm">
              by <span className="font-semibold">{post.author}</span> on {post.date}
            </p>
            <hr className="my-4" />
            <p className="text-gray-800 text-base leading-relaxed">{post.body}</p>
          </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Blog;
