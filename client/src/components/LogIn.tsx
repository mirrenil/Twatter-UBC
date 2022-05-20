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
  const { currentUser, isLoggedIn, fetchLoggedInUser } = useUserContext();
  const { dataIsCorrect } = useSignIn();

  useEffect(() => {
    if (currentUser) {
      onClose(true);
    }
  });

  const submitForm = () => {
    setFormIsSubmitted(true);
  };

  return (
    <div>
      <LogInForm submitForm={submitForm} />
    </div>
  );
};

export default LogIn;
