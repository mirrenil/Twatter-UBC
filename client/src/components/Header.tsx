import { CSSProperties, useState } from "react";
import LogInComponent from "./LogInComponent";
import SignUpComponent from "./SignUpComponent";
import shhLogo from "../shhh-logo.png";
import { useUserContext } from "./context/UserContext";
import { makeReq } from "../helper";

const Header = () => {
  const [isLogInOpen, setIsLogInOpen] = useState<Boolean>(false);
  const [isSignedInOpen, setIsSignedInOpen] = useState<Boolean>(false);

  const { isLoggedIn, currentUser, setIsLoggedIn, signOut } = useUserContext();


  console.log(isLoggedIn)

  console.log(currentUser);

  const signOutFunction = () => {
    setIsLogInOpen(false);
    signOut();
  }
  

  return (
  <div className="header">
        <div style={{ display: "flex" }}>
          <h1>Twatter</h1>
          <img style={logo} src={shhLogo} alt="Twatter's logo" />
          </div>
        <input className="search" type="search" name="search" id="search" placeholder="Search..." />


          {!isLoggedIn ? (
            <>
              <button style={btn} onClick={() => setIsLogInOpen(true)}>Sign In</button>
              <LogInComponent open={isLogInOpen} onClose={() => setIsLogInOpen(false)} />
              <button style={btn} onClick={() => setIsSignedInOpen(true)}>Sign Up</button>
              <SignUpComponent open={isSignedInOpen} onClose={() => setIsSignedInOpen(false)} />
            </>
              ) : (
                <>
                <span style={{fontSize: "2rem"}}>😈 </span>
                <button onClick={() => signOutFunction()} style={btn}>Sign Out</button>
            </>
              )}
      </div>
  );

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