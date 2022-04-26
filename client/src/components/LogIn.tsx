import React, { useState } from 'react'
import LogInForm from './LogInForm';
import StartPage from './pages/StartPage';

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
        <StartPage/>
      )} 
       </div>
  );
}

export default LogIn;