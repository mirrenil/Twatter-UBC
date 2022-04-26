import useForm from './useForm'
import "../App.css";

export interface User {
    username: string;
    email: string;
    password: string;
}
const SignUpForm = ({submitForm}) => {
   const {handleChange, handleFormSubmit, values, errors} = useForm(submitForm);
  return (
    <div className='container'>
        <h2>Become a twat!</h2>
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
                <button type="submit">Sign up</button>
            </div>
        </form>
    </div>
  )
};

export default SignUpForm;