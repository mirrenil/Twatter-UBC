import { CSSProperties, useState } from "react";
import LogInComponent from "./LogInComponent";
import SignUpComponent from "./SignUpComponent";

const Header = () => {
    const [isLogInOpen, setIsLogInOpen] = useState<Boolean>(false);
    const [isSignedInOpen, setIsSignedInOpen] = useState<Boolean>(false);

    return <div className="header">
        <h1>Twatter</h1>
        <input className="search" type="search" name="search" id="search" placeholder="Search..."/>
        <button style={btn} onClick={() => setIsLogInOpen(true)}>Sign In</button>
      <LogInComponent open={isLogInOpen} onClose={() => setIsLogInOpen(false)} />
      <div>
       <button style={btn} onClick={() => setIsSignedInOpen(true)}>Sign Up</button>
      <SignUpComponent open={isSignedInOpen} onClose={() => setIsSignedInOpen(false)} />
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