import { useState } from "react";
import LogInComponent from "./LogInComponent";
import SignUp from "./SignUpComponent";

const Header = () => {
    const [isOpen, setIsOpen] = useState<Boolean>(false);
    return <div className="header">
        <h1>Twatter</h1>
        <input className="search" type="search" name="search" id="search" placeholder="Search..."/>
        <button onClick={() => setIsOpen(true)}>Sign In</button>
      <LogInComponent open={isOpen} onClose={() => setIsOpen(false)} />
      <div>
       <button onClick={() => setIsOpen(true)}>Sign Up</button>
      <SignUp open={isOpen} onClose={() => setIsOpen(false)} />
      </div>
     
    </div>
};
export default Header;