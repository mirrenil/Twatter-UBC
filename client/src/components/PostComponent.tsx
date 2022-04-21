import React, { CSSProperties } from 'react';

export const PostComponent = () => {
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
};

const postHeaderStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-around",

}