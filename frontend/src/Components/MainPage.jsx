import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setChannels } from '../Slices/channelsSlice';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('token'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const MainPage = () => {
  const location = useLocation();

  const userId = JSON.parse(localStorage.getItem('token'));

  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels);
  console.log(channels);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get('/api/v1/channels', { headers: getAuthHeader() });
        console.log(response.data);
        dispatch(setChannels(response.data));
      } catch (err) {
        console.err;
      }
    };
    fetchChannels();
  }, [channels]);

  if (userId && userId.token) {
    return (
      <div>
        <Button>Выйти</Button>
        <p>Main Page</p>
        <ul>{channels.map((channel) => (<li>{channel.name}</li>))}</ul> 
      </div>
    );
  }
  console.log('token is missing');
  return (
  <Navigate to='/login' state={{ from: location }} />
  );
};

export default MainPage;