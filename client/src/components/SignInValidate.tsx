const SignInValidate = (values) => {
  let errors = {
    username: '',
    password: '',
  };
  if (!values.username) {
    errors.username = 'A username is required';
  }
  if (!values.password) {
    errors.password = 'A password is required';
  } else if (values.password.length < 5) {
    errors.password = 'Password must be at least 5 characters';
  }
  return errors;
};

export default SignInValidate;
