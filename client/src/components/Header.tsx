import { CSSProperties, useState } from "react";
import LogInComponent from "./LogInComponent";
import SignUpComponent from "./SignUpComponent";
import shhLogo from "../shhh-logo.png";

const Header = () => {
    const [isLogInOpen, setIsLogInOpen] = useState<Boolean>(false);
    const [isSignedInOpen, setIsSignedInOpen] = useState<Boolean>(false);

    return <div className="header">
      <div style={{display: "flex"}}>
        <h1>Twatter</h1>
        <img style={logo} src={shhLogo} alt="Twatter's logo" /></div>
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
const logo: CSSProperties = {
    width: "75px",
    height: "60px"
}
export default Header;