import React, { CSSProperties, useEffect, useState } from 'react';
import axios from 'axios';
import WallPostButtons from './WallPostButtons';

export const PostComponent = () => {
  const [wallPosts, setWallPosts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const fetchWallPostsData = () => {
    axios
      .get('http://localhost:3001/')
      .then((response) => {
        console.log('here');
        console.log(response)
      })
      .catch((err) => {
        console.log(err);
        console.log(axios.get('http://localhost:3001/wallposts'));
      });
  };

  useEffect(() => {
    fetchWallPostsData();
  });

  const handleEditState = () => {
    setIsEdit(true);
    console.log(isEdit);
  };

  return (
    <div style={rootstyle}>
      <div style={postHeaderStyle}>
        <h6 style={{ fontSize: '2rem', margin: 0 }}>Author</h6>
        <p style={{}}>23-04-22</p>
      </div>
      <div>
        Lorem Ipsum Dolor Sit amet Knasiga Kodare Is Coding Wow Lorem Ipsum
        Dolor Sit amet Knasiga Kodare Is Coding Wow Lorem Ipsum Dolor Sit amet
        Knasiga Kodare Is Coding Wow Lorem Ipsum Dolor Sit amet Knasiga Kodare
        Is
        
      </div>
      <WallPostButtons setEdit={handleEditState} />
    </div>

  );
};

const rootstyle: CSSProperties = {
  backgroundColor: 'rgba(237, 237, 237, 0.5)',
  height: '20rem',
  width: '40rem',
  borderRadius: '5px 22px 50px 22px',
  margin: '10px auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: "1rem",
  boxSizing: "border-box"
};

const postHeaderStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
};
