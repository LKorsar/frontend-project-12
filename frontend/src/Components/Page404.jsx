import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Page404 = () => {
  const handleClick = () => {};
    return (
    <div className="container-fluid">
        <h1>Error 404 Not Found</h1>
        <p>Страница удалена или в ссылке опечатка</p>
        <Button className="btn btn-primary" onClick={handleClick}>Вернуться на главную страницу</Button>
    </div>
  );
};

export default Page404;