import React, { CSSProperties, useEffect, useState } from 'react';
import axios from 'axios';



export const PostComponent = () => {
  const [wallPosts, setWallPosts] = useState([]);

  const fetchWallPostsData = () => {
    axios.get('http://localhost:3001/wallposts')
    .then((response) => {
      console.log('here');
      // const data = response.data;
      // setWallPosts(data);
      // console.log(data);
      // console.log(wallPosts);
      // console.log('Data has been retrieved');
    }).catch((err) => {
      console.log(err);
    })
  }





useEffect(() => {
  fetchWallPostsData();
})


  return (
    <div style={rootstyle}>
      <div style={postHeaderStyle}>
        <h6 style={{fontSize: "2rem", margin: 0}}>Author</h6>
        <p style={{}}>00:00:00</p>
      </div>
      <div>
        Lorem Ipsum Dolor Sit amet Knasiga Kodare Is Coding Wow Lorem Ipsum
        Dolor Sit amet Knasiga Kodare Is Coding Wow Lorem Ipsum Dolor Sit amet
        Knasiga Kodare Is Coding Wow Lorem Ipsum Dolor Sit amet Knasiga Kodare
        Is
      </div>
    </div>
  );
};

const rootstyle: CSSProperties = {
  backgroundColor: 'rgba(237, 237, 237, 0.5)',
  height: '20rem',
  width: '40rem',
  borderRadius: '5px 22px 50px 22px',
  margin: "auto"
};

const postHeaderStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-around",

}