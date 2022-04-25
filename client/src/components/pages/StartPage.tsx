import { useState } from 'react';
import NewPost from '../NewPost';
import {PostComponent} from '../PostComponent';
import SignUp from '../SignUp';

const StartPage = () => {
const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <PostComponent />
      <button onClick={() => setIsOpen(true)}>+</button>
      <NewPost open={isOpen} onClose={() => setIsOpen(false)} >
        </NewPost>
        {/* SIGN UP COMPONENT SHOULD BE ADDED IN LOG IN COMPONENT */}
        <SignUp />
    </div>
    
  ) 

};

export default StartPage;