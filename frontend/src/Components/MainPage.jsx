import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  console.log(userId);
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const MainPage = () => {
  const location = useLocation();
  const userId = JSON.parse(localStorage.getItem('userId'));
  console.log(userId);
  if (userId && userId.token) {
    return (
      <div>
        <Button>Выйти</Button>
        <p>Main Page</p>
      </div>
    );
  }
  console.log('token is missing');
  return (
  <Navigate to='/login' state={{ from: location }} />
  );
};

export default MainPage;