import React, { useState } from 'react'
import LogInForm from './LogInForm';
import StartPage from './pages/StartPage';
import SignedInSuccess from './SignedInSuccess';

const LogIn = () => {
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);

    const submitForm = () => {
        setFormIsSubmitted(true);
    };
  return (
    <div>
      {!formIsSubmitted ? (
        <LogInForm submitForm={submitForm}/>
      ) : (
        <SignedInSuccess/>
      )} 
       </div>
  );
}

export default LogIn;