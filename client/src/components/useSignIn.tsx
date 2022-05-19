import { FormEvent, useEffect, useState } from 'react';
import SignInValidate from './SignInValidate';

export const useSignIn = (submitForm?) => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const [isSubmitValid, setIsSubmitValid] = useState<Boolean>(false);
  const [errors, setErrors] = useState<any>({});
  const [dataIsCorrect, setDataIsCorrect] = useState<Boolean>(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors(SignInValidate(values));
    setDataIsCorrect(true);
    submitForm(true);
    setIsSubmitValid(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      submitForm(true);
    }
  }, [errors, dataIsCorrect, submitForm]);

  return { handleChange, handleFormSubmit, setIsSubmitValid, isSubmitValid, values, errors };
};
export default useSignIn;
