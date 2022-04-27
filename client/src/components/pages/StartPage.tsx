import React, { CSSProperties, FC, useEffect, useState } from 'react';
import NewPost from '../NewPost';
import { PostComponent } from '../PostComponent';
import { makeReq } from '../../helper';
import { useLocation } from 'react-router-dom';
export interface IWallPost {
  username: string;
  body: string;
  date: string;
  _id: string;
}

const StartPage: FC = () => {
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [wallPosts, setWallPosts] = useState<IWallPost[]>([]);
  const location = useLocation();


  useEffect(() => {
    const fetchWallPostsData = async () => {
        let response = await makeReq('/wallposts', 'GET');
        console.log(response)
        setWallPosts(response);
        return;
      };
    fetchWallPostsData();
  }, [location]);

  return (
    <div> 

        {wallPosts.map((post) => {
          return <PostComponent key={post._id} post={post} />;
        })}
     
          <button style={btn} onClick={() => setIsNewPostOpen(true)}>+</button>
          <NewPost
            open={isNewPostOpen}
            onClose={() => setIsNewPostOpen(false)}
          ></NewPost>

    </div>
  );
};

const btn: CSSProperties = {
  height: '3.5rem',
  width: '3.5rem',
  borderRadius: '100%',
  position: 'fixed',
  zIndex: 100,
  right: '20%',
  top: '80%',
  fontSize: '2.5rem',
  color: '#f2431f',
};

export default StartPage;
