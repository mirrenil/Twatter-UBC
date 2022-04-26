import { CSSProperties, useState } from "react";
import LogInComponent from "./LogInComponent";
import SignUp from "./SignUpComponent";

const Header = () => {
    const [isOpen, setIsOpen] = useState<Boolean>(false);
    return <div className="header">
        <h1>Twatter</h1>
        <input className="search" type="search" name="search" id="search" placeholder="Search..."/>
        <button style={btn} onClick={() => setIsOpen(true)}>Sign In</button>
      <LogInComponent open={isOpen} onClose={() => setIsOpen(false)} />
      <div>
       <button style={btn} onClick={() => setIsOpen(true)}>Sign Up</button>
      <SignUp open={isOpen} onClose={() => setIsOpen(false)} />
      </div>
     
    </div>
};
const btn: CSSProperties = {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "1rem",
    fontFamily: 'Permanent Marker',
    transform: "rotate(-0.02turn)"
}

export default Header;