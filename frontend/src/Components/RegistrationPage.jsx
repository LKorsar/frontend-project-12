import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from "axios";
import { logInSuccess } from "../Slices/authSlice";

const RegistrationPage = () => {
  const navigate = useNavigate()

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const dispatch = useDispatch();
  const logIn = (user) => dispatch(logInSuccess({ username: user }));

  const yupValidationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
    password: Yup.string()
      .required('Обязательное поле')
      .min(6, 'Не менее 6 символов'),
    confirmPassword: Yup.string()
      .required('Обязательное поле')
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
  });

  const handleSubmitForm = async (values, { setFieldError, setSubmitting }) => {
     try {
        const response = await axios.post('/api/v1/signup', { username: values.username, password: values.password });
        localStorage.setItem('token', JSON.stringify(response.data));
        logIn(values.username);
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          setFieldError('confirmPassword', 'Такой пользователь уже существует');
          setSubmitting(false);
          inputRef.current.select();
          throw err;
        }
        setSubmitting(false);
        inputRef.current.select();
        throw err;
      }
  };

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">Hexlet chat</a>
            </div>
          </nav>
          <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
              <div className="col-12 col-md-8 col-xxl-6 ">
                <div className="card shadow-sm">
                  <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                    <div>
                      <img src="/src/assets/avatar_1.jpg" className="rounded-circle" alt="Регистрация"/>
                    </div>
                    <Formik
                      initialValues={{
                        username: '',
                        password: '',
                        confirmPassword: '',
                      }}
                      validationSchema={yupValidationSchema}
                      onSubmit={handleSubmitForm}
                    >
                      {({ errors, touched }) => (
                      <Form className="w-50">
                        <h1 className="text-center mb-4">Регистрация</h1>
                        <div className="form-floating mb-3">
                          <Field
                            name="username"
                            id="username"
                            autoComplete="username"
                            placeholder="От 3 до 20 символов"
                            ref={inputRef}
                            className={`form-control ${
                              touched.username && errors.username ? "is-invalid" : ""
                            }`}
                          />
                          <label htmlFor="username">Имя пользователя</label>
                          <ErrorMessage
                            component="div"
                            name="username"
                            className="invalid-feedback invalid-tooltip"
                            placement="right"
                          />
                        </div>
                        <div className="form-floating mb-3">
                          <Field
                            name="password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            placeholder="Не менее 6 символов"
                            className={`form-control ${
                              touched.password && errors.password ? "is-invalid" : ""
                            }`}
                          />
                          <label htmlFor="password">Пароль</label>
                          <ErrorMessage
                            component="div"
                            name="password"
                            className="invalid-feedback invalid-tooltip"
                          />
                        </div>
                        <div className="form-floating mb-3">
                          <Field
                            name="confirmPassword"
                            id="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Пароли должны совпадать"
                            className={`form-control ${
                              touched.confirmPassword && errors.confirmPassword ? "is-invalid" : ""
                            }`}
                          />
                          <label htmlFor="confirmPassword">Подтвердите пароль</label>
                          <ErrorMessage
                            component="div"
                            name="confirmPassword"
                            className="invalid-feedback invalid-tooltip"
                          />
                        </div>
                        <Button type="submit" variant="outline-primary" className="w-100 btn">Зарегистрироваться</Button>
                      </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Toastify"></div>
      </div>
    </div>
  );
};

export default RegistrationPage;