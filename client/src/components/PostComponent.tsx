import React, { CSSProperties, useState } from 'react';
import WallPostButtons from './WallPostButtons';
import {IWallPost} from './pages/StartPage'
import { useUserContext } from './context/UserContext';
import { makeReq } from '../helper';
import { Navigate, useNavigate } from 'react-router-dom';

interface Props {
  post: IWallPost,

}

export const PostComponent = (props: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [body, setBody] = useState(props.post.body);
  const { currentUser } = useUserContext();
  const navigate = useNavigate();

  const handleEditState = () => {
    setIsEdit(true);
    console.log(isEdit);
  };

  const handleOnChange = (e) => {
    setBody(e.target.value);
    console.log(e.target.value);
  }

  const handleOnSubmit = () => {
    props.post.body = body;
    updateWallPost(body);
    setIsEdit(false);
  }

  const updateWallPost = async (body: string) => {
    const newPostBody = {body: body, username: currentUser}
    console.log(body);
    console.log(props.post._id);
    let response = await makeReq(`/wallposts/${props.post._id}`, "PUT", newPostBody)
    console.log(response)
    
    setTimeout(() => {
      navigate('/')
    }, 1000);
  };

  return (
    <div style={rootstyle}>
      <div style={postHeaderStyle}>
        <h6 style={{ fontSize: '2rem', margin: 0 }}>{props.post.username}</h6>
        <p style={{}}>{props.post.date}</p>
      </div>

     {!isEdit ? (
       <div>
        {props.post.body}
      </div>

     ) : (
       <form onSubmit={handleOnSubmit}>
         <input type="text" value={body} onChange={(e) => handleOnChange(e)} />
       </form>
     )}

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
