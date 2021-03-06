import { CSSProperties, useState } from 'react';
import ReactDOM from 'react-dom';
import SignUpForm from './SignUpForm';
import SignUpSuccess from './SignUpSuccess';

interface ISignUpProps {
  open: boolean;
  onClose: () => void;
}

const SignUpComponent = ({ open, onClose }: ISignUpProps) => {
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  if (!open) return null;

  const submitForm = () => {
    setFormIsSubmitted(true);
  };

  return ReactDOM.createPortal(
    <>
      <div style={overlayStyles}>
        <div style={modalStyles}>
          <div>
            {!formIsSubmitted ? (
              <SignUpForm submitForm={submitForm} />
            ) : (
              <SignUpSuccess />
            )}
          </div>
          <button onClick={onClose} style={closeButtonStyle}>
            X
          </button>
        </div>
      </div>
    </>,
    document.getElementById('signup')!
  );
};
const modalStyles: CSSProperties = {
  position: 'fixed',
  top: '56%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'pink',
  padding: '50px',
  zIndex: 1000,
  borderRadius: '22px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '400px',
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
  height: '2.5rem',
  width: '2.5rem',
  background: 'transparent',
  border: 'none',
};
export default SignUpComponent;
