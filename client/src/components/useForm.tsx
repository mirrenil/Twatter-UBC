import { FormEvent, useEffect, useState } from "react"; 
import Validation from "./Validation";


const useForm = (submitForm) => {

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
    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        setErrors(Validation(values));
        setDataIsCorrect(true);
        submitForm(true);
        console.log(values);
    };

    useEffect(() => {
        if(Object.keys(errors).length === 0 && dataIsCorrect) {
            submitForm(true);
        }
    }, [errors, dataIsCorrect, submitForm]);

    return {handleChange, handleFormSubmit, values, errors};
}
    export default useForm;