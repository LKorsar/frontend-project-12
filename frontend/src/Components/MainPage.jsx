import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { setChannels } from '../Slices/channelsSlice.jsx';
import { logOutSuccess } from '../Slices/authSlice.jsx';

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
  const channels = useSelector((state) => state.channelsReducer.channels);
  console.log(channels);

  useEffect(() => {
    const fetchChannels = async () => {
      const response = await axios.get('/api/v1/channels', { headers: getAuthHeader() });
      console.log(response.data);
      dispatch(setChannels(response.data)); 
    };
    fetchChannels();
  }, [channels]);

  console.log(channels);

  const handleClickLogOut = () => {
    dispatch(logOutSuccess());
  };

  const [newMessage, setNewMessage] = useState('');
  const handleSetNewMessage = (event) => {
    setNewMessage(event.target.value);
  };

  const btnClass = classNames(
    'btn', 'btn-group-vertical',
    { disabled: newMessage === '' ? true : false },
  );

  if (userId && userId.token) {
    return (
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
              <div className="container">
                <a className="navbar-brand" href="/">Hexlet Chat</a>
                <Button className="btn btn-primary" type="button" onClick={handleClickLogOut}>Выйти</Button>
              </div>
            </nav>
            <div className="container h-100 my-4 overflow-hidden rounded shadow">
              <div className="row h-100 flex-md-row bg-white">
                <div className="col col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                  <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                    <b>Каналы</b>
                    <Button type="button" className="p-0 text-primary btn btn-group-vertical">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-plus-square">
                        <path d="M 14 1 a 1 1 0 0 1 1 1 v 12 a 1 1 0 0 1 -1 1 H 2 a 1 1 0 0 1 -1 -1 V 2 a 1 1 0 0 1 1 -1 Z M 2 0 a 2 2 0 0 0 -2 2 v 12 a 2 2 0 0 0 2 2 h 12 a 2 2 0 0 0 2 -2 V 2 a 2 2 0 0 0 -2 -2 Z"></path>
                        <path d="M 8 4 a 0.5 0.5 0 0 1 0.5 0.5 v 3 h 3 a 0.5 0.5 0 0 1 0 1 h -3 v 3 a 0.5 0.5 0 0 1 -1 0 v -3 h -3 a 0.5 0.5 0 0 1 0 -1 h 3 v -3 A 0.5 0.5 0 0 1 8 4"></path>
                      </svg>
                      <span className="visually-hidden">+</span>
                    </Button>
                  </div>
                  <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                    {channels.map((channel) => {
                      return (
                      <li key={channel.id} className="nav-item w-100">
                        <Button type="button" className="w-100 rounded-0 text-start btn btn-secondary">
                          <span className="me-1">#</span>
                          {channel.name}
                        </Button>
                      </li>);
                    })}
                  </ul>
                </div>
                <div className="col p-0 h-100">
                  <div className="d-flex flex-column h-100">
                    <div className="bg-light mb-4 p-3 shadow-sm small">
                      <p className="m-0">
                        <b>{`# ${channels[0].name}`}</b>
                      </p>
                      <span className="text-muted">0 сообщений</span>
                    </div>
                    <div id="messages-box" className="chat-messages overflow-auto px-5"></div>
                    <div className="mt-auto px-5 py-3">
                      <form className="py-1 boarder rounded-2">
                        <div className="input-group has-validation">
                          <input
                            name="body"
                            aria-label="Новое сообщение"
                            placeholder="Введите сообщение..."
                            className="border-0 p-0 ps-2 form-control"
                            value={newMessage}
                            onChange={handleSetNewMessage}
                            ></input>
                          <Button type="submit" className={btnClass}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 16"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="bi bi-arrow-right-square"
                            >
                              <path
                              fillRule="evenodd"
                              d="M 15 2 a 1 1 0 0 0 -1 -1 H 2 a 1 1 0 0 0 -1 1 v 12 a 1 1 0 0 0 1 1 h 12 a 1 1 0 0 0 1 -1 Z M 0 2 a 2 2 0 0 1 2 -2 h 12 a 2 2 0 0 1 2 2 v 12 a 2 2 0 0 1 -2 2 H 2 a 2 2 0 0 1 -2 -2 Z m 4.5 5.5 a 0.5 0.5 0 0 0 0 1 h 5.793 l -2.147 2.146 a 0.5 0.5 0 0 0 0.708 0.708 l 3 -3 a 0.5 0.5 0 0 0 0 -0.708 l -3 -3 a 0.5 0.5 0 1 0 -0.708 0.708 L 10.293 7.5 Z"
                              ></path>
                            </svg>
                            <span className="visually-hidden">Отправить</span>
                          </Button>
                        </div>
                      </form>
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
  }
  console.log('token is missing');
  return (
  <Navigate to='/login' state={{ from: location }} />
  );
};

export default MainPage;