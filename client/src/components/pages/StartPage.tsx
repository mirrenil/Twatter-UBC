import { CSSProperties, FC, useEffect, useState } from 'react';
import NewPost from '../NewPost';
import { PostComponent } from '../PostComponent';
import { makeReq } from '../../helper';


interface IWallPosts {
  user: string,
  
}

const StartPage: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [wallPosts, setWallPosts] = useState<IWallPosts>([]);
  const [user, setUser] = useState();



  const fetchWallPostsData = async () => {
    let response = await makeReq('/wallposts', 'GET');
    console.log(response);
    setWallPosts(response);

    wallPosts.map(post => {
      console.log(post)
    })
    return
  };



  useEffect(() => {
    fetchWallPostsData();
  }, []);

  return (
    <>
        {wallPosts.map(post => {
          <PostComponent props={post}/>
        })}
        

      <button style={buttonStyle} onClick={() => setIsOpen(true)}>
        +
      </button>
      <NewPost open={isOpen} onClose={() => setIsOpen(false)}></NewPost>

    </>
  );
};

const buttonStyle: CSSProperties = {
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
