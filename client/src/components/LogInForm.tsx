import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { makeReq } from "../helper";
import LogIn from "./LogIn";
import useSignIn from "./useSignIn";

export interface LoggedInUser {
    username: string;
    password: string;
}

const LogInForm = ({ submitForm }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logIn = async (username, password) => {
        console.log(username, password);
        const user = { username, password };
        let response = await makeReq("/login", "POST", user);
        console.log(response);
        setTimeout(() => {
            setIsLoggedIn(true);
            navigate('/');
        }, 1000);
    }
        const { handleChange, handleFormSubmit, values, errors } = useSignIn(submitForm);
        return (
            <div className='sign-up-container'>
                <h2 className="title">Sign in</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className='name'>
                        <input placeholder='username' type="text" name="username" value={values.username} onChange={handleChange} />
                        {errors.username && <p className='error'>{errors.username}</p>}
                    </div>
                    <div className='password'>
                        <input placeholder='password' type="password" name="password" value={values.password} onChange={handleChange} />
                        {errors.password && <p className='error'>{errors.password}</p>}
                    </div>
                    <div className='btn'>
                        <button onClick={() => logIn(values.username, values.password)} type="submit">Log in</button>
                    </div>
                </form>
            </div>
        )
    };

    export default LogInForm;