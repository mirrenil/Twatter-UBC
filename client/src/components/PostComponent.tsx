import React, { CSSProperties, useState } from 'react';
import WallPostButtons from './WallPostButtons';
import {IWallPost} from './pages/StartPage'
import { useUserContext } from './context/UserContext';

interface Props {
  post: IWallPost,
  
}

export const PostComponent = (props: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const { currentUser } = useUserContext();

  const handleEditState = () => {
    setIsEdit(true);
    console.log(isEdit);
  };



  return (
    <div style={rootstyle}>
      <div style={postHeaderStyle}>
        <h6 style={{ fontSize: '2rem', margin: 0 }}>{props.post.username}</h6>
        <p style={{}}>{props.post.date}</p>
      </div>
      <div>
        {props.post.body}
      </div>
      {currentUser === props.post.username ? (
        <WallPostButtons setEdit={handleEditState} />
      ):(
        null
      )}
      
    </div>
  );
};

const rootstyle: CSSProperties = {
  backgroundColor: 'rgba(237, 237, 237, 0.5)',
  height: '100%',
  width: '40rem',
  borderRadius: '5px 22px 50px 22px',
  margin: '10px auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: '1rem',
  boxSizing: 'border-box',
};

const postHeaderStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
};
