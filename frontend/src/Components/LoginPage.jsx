import { useRef, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logInSuccess, logOutSuccess } from './Slices/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const logIn = (user) => dispatch(logInSuccess(user));
  const logOut = () => dispatch(logOutSuccess());

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
        username: '',
        password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/v1/login', values);
        console.log(response.status);
        localStorage.setItem('token', JSON.stringify(response.data));
        console.log(JSON.parse(localStorage.getItem('token')));
        logIn(values.username);
        const { from } = location.state;
        navigate(from);
      }
      catch(error) {
        formik.setSubmitting(false);
        if (error.isAxiosError && error.response.status === 401) {
          logOut();
          inputRef.current.select();
        }
        throw error;
      }
    },
  });

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm  navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">Hexlet Chat</a>
            </div>
          </nav>
          <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
              <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow-sm">
                  <div className="card-body row p-5">
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                      <img src="/src/assets/avatar.jpg" className="rounded-circle" alt="Войти" />
                    </div>
                    <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
                      <h1 className="text-center mb-4">Войти</h1>
                      <Form.Group className="form-floating mb-3">
                        <Form.Control
                          name="username"
                          autoComplete="username"
                          required
                          placeholder="Ваш ник"
                          id="username"
                          isInvalid={authFailed}
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          ref={inputRef}
                        ></Form.Control>
                        <Form.Label htmlFor="username">Ваш ник</Form.Label>
                      </Form.Group>
                      <Form.Group className="form-floating mb-4">
                        <Form.Control
                          name="password"
                          autoComplete="current-password"
                          required
                          placeholder="Пароль"
                          type="password"
                          id="password"
                          value={formik.values.password}
                          isInvalid={authFailed}
                          onChange={formik.handleChange}
                        ></Form.Control>
                        <Form.Label htmlFor="password">Пароль</Form.Label>
                        <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
                      </Form.Group>
                      <Button type="submit" className="w-100 mb-3 btn" variant="outline-primary">Войти</Button>
                    </Form>
                  </div>
                  <div className="card-footer p-4">
                    <div className="text-center">
                      <span>Нет аккаунта? </span>
                      <a href="/signup">Регистрация</a>
                    </div>
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

export default LoginPage;