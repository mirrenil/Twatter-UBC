import React, { useState } from 'react'
import SignUpForm from './SignUpForm'
import SignUpSuccess from './SignUpSuccess'

const Form = () => {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false);

    const submitForm = () => {
        setFormIsSubmitted(true);
    };
  return (
    <div>
      {!formIsSubmitted ? (
        <SignUpForm submitForm={submitForm}/>
      ) : (
        <SignUpSuccess />
      )} 
       </div>
  );
}

export default Form;