import { CSSProperties } from 'react';
import '../App.css';
import { useUserContext } from './context/UserContext';
import useSignIn from './useSignIn';

export interface LoggedInUser {
  username: string;
  password: string;
}

interface Props {
  submitForm: Function
}

const LogInForm = ({ submitForm }: Props) => {
  const { setIsLoggedIn, isLoggedIn, logIn } = useUserContext();

  const { handleChange, handleFormSubmit, values, errors } =
    useSignIn(submitForm);
  return (
    
    <div className="sign-up-container">
      <h2 className="title">Sign in</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="name">
          <input
            placeholder="username"
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div className="password">
          <input
            placeholder="password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="btn">
          <button
            onClick={() => logIn(values.username, values.password)}
            type="submit"
            style={submitButtonStyle}
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};
const submitButtonStyle: CSSProperties = {
  height: '2.5rem',
  width: '5rem',
  color: 'white',
  backgroundColor: 'orange',
  border: 'none',
  fontSize: '1.3rem',
  fontFamily: 'Permanent Marker, cursive',
};

export default LogInForm;
