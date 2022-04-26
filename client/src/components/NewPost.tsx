import { CSSProperties, FormEvent, FormEventHandler, useState } from 'react';
import ReactDOM from 'react-dom';
import { makeReq } from '../helper';


// interface Props {
//   open: boolean,
//   onClose: () => any
// }

function NewPost({ open, onClose }) {
  const [postBody, setPostBody] = useState<string>("");
  if (!open) return null;

  const addNewPost = async () => {
      let response = await makeReq('/users/authenticate', 'GET');
      console.log(response);
  }
  
  const handleOnClickPost = (e: FormEvent) => {
    e.preventDefault();
    addNewPost();
    console.log(postBody);
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
          <h2>SHARE SOME TWATTER</h2>
          <form action="" onSubmit={handleOnClickPost}>
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
          <button style={submitButtonStyle} type="submit" >Twat</button>
          </form>
        </div>
        <button onClick={onClose} style={closeButtonStyle}>
          X{/* <CloseIcon style={{ color: "#333" }} /> */}
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
  fontSize: "1.3rem"
}

export default NewPost;
