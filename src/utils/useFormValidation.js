import { useState, useRef, useEffect } from 'react';

export function useFormValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    setIsValid(formRef.current.checkValidity());
  });

  const handleChange = (evt) => {
    const { name, value, validationMessage } = evt.target;
    setValues((oldValues) => ({ ...oldValues, [name]: value }));
    setErrors((oldErrors) => ({ ...oldErrors, [name]: validationMessage }));
  }

  const reset = (initialValues = {}) => {
    setValues(initialValues);
    setErrors({});
    setIsValid(formRef.current.checkValidity());
  }

  const setValue = (name, value) => {
    setValues((oldValues) => ({ ...oldValues, [name]: value }));
    setIsValid(formRef.current.checkValidity());
  }

  return { values, errors, isValid, handleChange, setValue, reset, formRef };
}
