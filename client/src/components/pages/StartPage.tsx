import { CSSProperties, useState } from 'react';
import NewPost from '../NewPost';
import {PostComponent} from '../PostComponent';

const StartPage = () => {
const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <PostComponent />
      <button style={buttonStyle} onClick={() => setIsOpen(true)}>+</button>
      <NewPost open={isOpen} onClose={() => setIsOpen(false)} >
        </NewPost>
    </div>
    
  ) 

};

const buttonStyle: CSSProperties = {
  height: "3.5rem",
  width: "3.5rem",
  borderRadius: "100%",
  position: "fixed",
  zIndex: 100,
  right: "20%",
  top: "80%",
  fontSize: "2.5rem",
  color: "#f2431f"
  
}

export default StartPage;