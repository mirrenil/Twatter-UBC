import { CSSProperties } from 'react';
import ReactDOM from 'react-dom';


 function NewPost({open, children, onClose}) {
    if (!open) return null;

    return ReactDOM.createPortal(
      <>
        <div style={overlayStyles} />
        <div style={modalStyles}>
          <div>
            <h2>SHARE SOME TWATTER</h2>
            <input style={{width: "180px", height: "100px"}} type="text" name="post" id="post" />
            <button type="submit">TWAT IT</button>
          </div>
          <button onClick={onClose} style={{ position: "fixed", padding: '0', top: '15px', left:'5px' }}>X
            {/* <CloseIcon style={{ color: "#333" }} /> */}
          </button>
        </div>
      </>,
      document.getElementById("portal")!
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
  width: '200px',
  borderRadius: "22px",
  height: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}

const overlayStyles: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .8)",
  zIndex: 1000,
};

export default NewPost;