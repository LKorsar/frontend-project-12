import React, { useEffect, useRef, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import * as Yup from "yup";
import axios, { formToJSON } from "axios";

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formIsValid, setFormIsValid] = useState(null);

  const location = useLocation();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const yupValidationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
    password: Yup.string()
      .required('Обязательное поле')
      .min(6, 'Не менее 6 символов'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
  });

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (formIsValid) {
     try {
        const response = await axios.post('/api/v1/signup', { username: username, password: password });
        console.log(response);
        return (<Navigate to="/login" state={{ from: location }} />)
      } catch (err) {
        throw err;
      }
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
                    <Form className="w-50" onSubmit={handleSubmitForm}>
                      <h1 className="text-center mb-4">Регистрация</h1>
                      <Form.Group className="form-floating mb-3">
                        <Form.Control
                          name="username"
                          id="username"
                          autoComplete="username"
                          placeholder="От 3 до 20 символов"
                          isInvalid
                          value={username}
                          onChange={handleChangeUsername}
                          ref={inputRef}
                        />
                        <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                        <Form.Control.Feedback type="invalid">От 3 до 20 символов</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          name="password"
                          id="password"
                          type="password"
                          placeholder="Не менее 6 символов"
                          isInvalid
                          autoComplete="new-password"
                          value={password}
                          onChange={handleChangePassword}
                        />
                        <Form.Label htmlFor="password">Пароль</Form.Label>
                        <Form.Control.Feedback type="invalid">Не менее 6 символов</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          name="confirmPassword"
                          id="confirmPassword"
                          type="password"
                          autoComplete="new-password"
                          placeholder="Пароли должны совпадать"
                          isInvalid
                          value={confirmPassword}
                          onChange={handleChangeConfirmPassword}
                        />
                        <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
                        <Form.Control.Feedback type="invalid">Пароли должны совпадать</Form.Control.Feedback>
                      </Form.Group>
                      <Button type="submit" variant="outline-primary" className="w-100 btn">Зарегистрироваться</Button>
                    </Form>
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