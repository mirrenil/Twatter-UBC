import { CSSProperties, useState } from 'react';
import LogInComponent from './LogInComponent';
import SignUpComponent from './SignUpComponent';
import shhLogo from '../shhh-logo.png';
import { useUserContext } from './context/UserContext';

const Header = () => {
  const [isLogInOpen, setIsLogInOpen] = useState<boolean>(false);
  const [isSignedInOpen, setIsSignedInOpen] = useState<boolean>(false);

  const { isLoggedIn, currentUser, signOut } = useUserContext();

  const signOutFunction = () => {
    setIsLogInOpen(false);
    signOut();
  };

  return (
    <div className="header">
      <div style={{ display: 'flex' }}>
        <h1>Twatter</h1>
        <img style={logo} src={shhLogo} alt="Twatter's logo" />
      </div>
      <div style={{ display: 'flex' }}>
        {!isLoggedIn ? (
          <>
            <button style={btn} onClick={() => setIsLogInOpen(true)}>
              Sign In
            </button>
            <LogInComponent
              open={isLogInOpen}
              onClose={() => setIsLogInOpen(false)}
            />
            <button style={btn} onClick={() => setIsSignedInOpen(true)}>
              Sign Up
            </button>
            <SignUpComponent
              open={isSignedInOpen}
              onClose={() => setIsSignedInOpen(false)}
            />
          </>
        ) : (
          <>
            <div style={{ display: 'flex' }}>
              <span
                style={{ color: 'white', fontSize: '1.5rem', margin: '1rem' }}
              >
                {currentUser}
              </span>
              <div
                style={{
                  border: '2px solid white',
                  height: '3rem',
                  width: '3rem',
                  borderRadius: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '2rem', marginTop: '7px' }}>😈</span>
              </div>
            </div>
            <button onClick={() => signOutFunction()} style={btn}>
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const btn: CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: 'white',
  fontSize: '1rem',
  fontFamily: 'Permanent Marker',
  transform: 'rotate(-0.02turn)',
};

const logo: CSSProperties = {
  width: '75px',
  height: '60px',
};

export default Header;
