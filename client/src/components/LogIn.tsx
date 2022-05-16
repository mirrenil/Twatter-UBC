import React, { useState } from 'react'
import LogInForm from './LogInForm';
import SignedInSuccess from './SignedInSuccess';
import { useUserContext } from './context/UserContext';

const LogIn = () => {
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const {currentUser} = useUserContext();

    const submitForm = () => {
        setFormIsSubmitted(true);
    };
  return (
    <div>
      {!currentUser ? (
        <LogInForm submitForm={submitForm}/>
      ) : (
        <SignedInSuccess/>
      )} 
       </div>
  );
}

export default LogIn;