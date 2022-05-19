import React, { useEffect, useState } from 'react';
import LogInForm from './LogInForm';
import SignedInSuccess from './SignedInSuccess';
import { useUserContext } from './context/UserContext';
import useSignIn from './useSignIn';

interface Props {
  onClose;
}

const LogIn = ({ onClose }: Props) => {
  const [formIsSubmitted, setFormIsSubmitted] = useState<Boolean>(false);
  const { currentUser } = useUserContext();
  const { isSubmitValid } = useSignIn();

  useEffect(() => {
    if (formIsSubmitted) {
      setTimeout(() => {
        onClose(true);
      }, 1000);
    }
  }, [currentUser]);

  const submitForm = () => {
    setFormIsSubmitted(true);
  };

  return (
    <div>
      {/* {!currentUser ? (
        <LogInForm submitForm={submitForm}/>
      ) : (
        <SignedInSuccess />
      )}  */}
      <LogInForm submitForm={submitForm} />
    </div>
  );
};

export default LogIn;
