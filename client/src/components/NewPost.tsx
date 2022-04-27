import { CSSProperties, FormEvent, useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { makeReq } from '../helper';
import { useUserContext } from './context/UserContext';

/*
interface Props {
  open: boolean,
  onClose: () => any
} */

function NewPost({ open, onClose }) {
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        // const [currentUser, setCurrentUser] = useState('');
        const [postBody, setPostBody] = useState<string>('');
        const [newPost, setNewPost] = useState({});
        const navigate = useNavigate();
        const {currentUser} = useUserContext();


  if (!open) return null;



  const addNewPost = async (currentUser, postBody: string) => {
    const newWallPost = { username: currentUser, body: postBody};
    setNewPost({ currentUser, postBody})
      let response = await makeReq('/wallposts/newpost', "POST", newWallPost);
        setTimeout(() => {
          navigate('/');
        }, 1000);
        return;
  }

  const handleOnClickPost = (e: FormEvent) => {
    console.log('handleonclickpost');
    e.preventDefault();
    addNewPost(currentUser, postBody);
    return
  }

  const handleOnChange = (e) => {
    setPostBody(e.target.value)
  }

  return ReactDOM.createPortal(
    <>
      <div style={overlayStyles} />
      <div style={modalStyles}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{fontFamily: "Permanent Marker, cursive"}}>SHARE SOME TWATTER</h2>
          <h4 style={{fontFamily: "Permanent Marker, cursive"}}>{currentUser}</h4>
          <form onSubmit={handleOnClickPost}>
          <input
            style={{ width: '70%', height: '100px', border: 'none' }}
            type="text"
            value={postBody}
            onChange={handleOnChange}
            name="post"
            id="post"
            placeholder='Any secrets you want to share?...'
            required
          />
          <button  style={submitButtonStyle} type="submit" >Twat</button>
          </form>
        </div>
        <button onClick={onClose} style={closeButtonStyle}>X
        </button>
      </div>
    </>,
    document.getElementById('portal')!
  );
}
const modalStyles: CSSProperties = {
  position: 'fixed',
  top: '56%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'pink',
  padding: '50px',
  zIndex: 1000,
  width: '30rem',
  borderRadius: '22px',
  height: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const overlayStyles: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .8)',
  zIndex: 1000,
};

const closeButtonStyle: CSSProperties = {
  position: 'fixed',
  padding: '0',
  top: '10px',
  left: '5px',
  height: "2.5rem",
  width: "2.5rem",
  background: "transparent",
  border: 'none'
};

const submitButtonStyle: CSSProperties = {
  height: '2.5rem',
  width: '5rem',
  color: "white",
  backgroundColor: "orange",
  border: 'none',
  fontSize: "1.3rem",
  fontFamily: "Permanent Marker, cursive"
};

export default NewPost;
