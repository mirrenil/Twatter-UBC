import useForm from "./context/useForm";
import "../App.css";
import { makeReq } from "../helper";
import { CSSProperties, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface User {
    username: string;
    email: string;
    password: string;
}

  
const SignUpForm = ({submitForm}) => {
const navigate = useNavigate();
 const [user, setUser] = useState(false);

 const signUp = async (username, email, password) => {
    
     console.log(username, email, password);
    const newUser = { username, email, password };
    let response = await makeReq("users/register", "POST", newUser);
    console.log(response);
    setTimeout(() => {
      setUser(true);
      navigate('/');
    }, 1000);
  }
   const {handleChange, handleFormSubmit, values, errors} = useForm(submitForm);
  return (
    <div className='container'>
        <h2 className="title">Become a twat!</h2>
        <form onSubmit={handleFormSubmit}>
            <div className='name'>
                <input placeholder='username' type="text" name="username" value={values.username} onChange={handleChange}/>
                {errors.username && <p className='error'>{errors.username}</p>}
            </div>
            <div className='email'>
                <input placeholder='email' type="text" name="email" value={values.email} onChange={handleChange} />
                 {errors.email && <p className='error'>{errors.email}</p>}
            </div>
                <div className='password'>
                <input placeholder='password' type="password" name="password" value={values.password} onChange={handleChange}/>
                 {errors.password && <p className='error'>{errors.password}</p>}
            </div>
            <div className='btn'>
                <button onClick={() => signUp(values.username, values.email, values.password)} type="submit" style={submitButtonStyle}>Sign up</button>
            </div>
        </form>
    </div>
  )
};

const submitButtonStyle: CSSProperties = {
    height: '2.5rem',
    width: '5.5rem',
    color: "white",
    backgroundColor: "orange",
    border: 'none',
    fontSize: "1.3rem",
    fontFamily: "Permanent Marker, cursive"
  };

export default SignUpForm;