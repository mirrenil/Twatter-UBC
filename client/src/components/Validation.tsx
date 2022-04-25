const Validation = (values) => {
    let errors = {
        username: '',
        email: '',
        password: '',
    };
    if (!values.username) {
        errors.username = 'A username is required';
    }
    if (!values.email) {
        errors.email = 'An email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email is invalid";
    }
    if (!values.password) {
        errors.password = 'A password is required';
    } else if (values.password.length < 5) {
        errors.password = 'Password must be at least 5 characters';
    }
    return errors;
};

export default Validation;