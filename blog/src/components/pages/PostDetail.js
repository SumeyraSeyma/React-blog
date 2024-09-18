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
              className="mb-5 h-[400px] w-full rounded-xl bg-no-repeat object-cover object-center transition-transform duration-200 ease-out hover:scale-[1.02]"
            />
          </div>
        ))
      }
    </div>
  );
}

export default PostDetail;