import React, {useEffect, useState} from 'react'
import Validation from './Validation';
import "../App.css";

const SignUpForm = ({submitForm}) => {

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<any>({});
    const [dataIsCorrect, setDataIsCorrect] = useState(false);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };
    const handleFormSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        setDataIsCorrect(true);
    };

    useEffect(() => {
        if(Object.keys(errors).length === 0 && dataIsCorrect) {
            submitForm(true);
        }
    }, [ errors]);
    
  return (
    <div className='container'>
        <h2>Become a twat!</h2>
        <form>
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
                <button onClick={handleFormSubmit}>Sign up</button>
            </div>
        </form>
    </div>
  )
};

export default SignUpForm;