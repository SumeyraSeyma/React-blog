import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PostDetail() {
  const [data, setData] = useState(null);
  const { id } = useParams();

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
              <h1 className="text-2xl mb-2 font-bold text-center">{post.title}</h1>
              <p className="text-zinc-500 md:space-y-0 text-start dark:text-zinc-400">{post.body}</p>
            </div>
            {post.detail && post.detail.map((detail, index) => (
              <div key={index} className="max-w-4xl mx-auto p-5">
                <h2 className="text-xl font-bold mt-4 mb-2">{detail.title}</h2>
                <div className="text-zinc-500 md:space-y-0 text-start dark:text-zinc-400">
                  {detail.body.split("\n\n").map((paragraph, pIndex) => (
                    <p style={{ marginBottom: '16px' }} key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))  
            }
          </div>
        ))
      }
    </div>
  );
}

export default PostDetail;