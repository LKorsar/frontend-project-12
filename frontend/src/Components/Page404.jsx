import { useLocation, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import React from 'react';

const Page404 = () => {
  const location = useLocation();
  
  return (
    <div className="container-fluid">
        <h1>Error 404 Not Found</h1>
        <p>Страница удалена или в ссылке опечатка</p>
        <Button className="btn btn-primary" as={Link} to="/login" state={{ from: location }}>Вернуться на главную страницу</Button>
    </div>
  );
};

export default Page404;