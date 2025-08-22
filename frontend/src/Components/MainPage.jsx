import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useGetChannelsQuery, useAddChannelMutation, useEditChannelMutation, useRemoveChannelMutation } from '../services/channelsApi.js';
import { logOutSuccess } from '../Slices/authSlice.jsx';
import { getMessages, addMessage } from '../services/messagesApi.js';
import { setActiveChannel } from '../Slices/channelsSlice.jsx';
import CustomSpinner from './Spinner.jsx';
import chooseModal from '../modals/index.js';

const renderModal = (modalType, handleAddChannel, hideModal, handleRenameChannel, handleDeleteChannel) => {
  if (!modalType.type) {
    return null;
  }
  const Component = chooseModal(modalType.type);
  return <Component 
    modalType={modalType}
    handleAddChannel={handleAddChannel}
    onHide={hideModal}
    handleRenameChannel={handleRenameChannel}
    handleDeleteChannel={handleDeleteChannel}
  />;
};

const MainPage = () => {
  const location = useLocation();

  const userId = JSON.parse(localStorage.getItem('token'));
  const currentUser = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const handleClickLogOut = () => {
    dispatch(logOutSuccess());
    localStorage.removeItem('token');
  };

  const { data: channels, isLoading: isLoadingChannels, refetch: refetchChannels } = useGetChannelsQuery();
  const [renameChannel] = useEditChannelMutation();
  const [deleteChannel] = useRemoveChannelMutation();
  const [addNewChannel] = useAddChannelMutation();

  const handleAddChannel = (newChannel) => {
    addNewChannel({ name: newChannel });
    refetchChannels();
  };
  const handleDeleteChannel = (id) => {
    deleteChannel(id);
    refetchChannels();
  };
  const handleRenameChannel = (id, newName) => {
    renameChannel({ id: id, name: newName });
    refetchChannels();
  };

  const { data: messages, refetch: refetchMessages } = getMessages();
  const [addNewMessage] = addMessage();
  const [newMessage, setNewMessage] = useState('');
  console.log(messages);

  const messageBtnClass = classNames(
    'btn', 'btn-group-vertical', 'btn-light',
    { disabled: newMessage === '' ? true : false },
  );

  const activeChannel = useSelector((state) => state.channelsReducer.activeChannel);
  console.log(activeChannel);
  
  const [messagesCount, setMessagesCount] = useState(0);
  useEffect(() => {
    if (messages && messages.length > 0) {
      const messagesOfActiveChannel = messages.filter((message) => message.channelId === activeChannel.id);
      setMessagesCount(messagesOfActiveChannel.length);
    }
  }, [activeChannel, messages]);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    const messageToAdd = { body: newMessage, channelId: activeChannel.id, username: currentUser };
    addNewMessage(messageToAdd);
    refetchMessages();
    setNewMessage('');
  };

  const [modalType, setModalType] = useState({ type: null, item: null });
  const hideModal = () => setModalType({ type: null, item: null });
  const showModal = (type, item = 0) => {
    setModalType({ type, item })
  };
  
  if (userId) {
    if (isLoadingChannels) {
      return <CustomSpinner />;
    }
    return (
      <>
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
                    <Button type="button" className="p-0 text-primary btn btn-light btn-group-vertical" onClick={() => showModal('adding')}>
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
                      const channelBtnclass = classNames(
                        'w-100', 'rounded-0', 'text-start', 'btn',
                        channel.id === activeChannel.id ? 'btn-secondary' : 'btn-light',
                      );
                      if (channel.removable === false) {
                        return (
                          <li key={channel.id} className="nav-item w-100">
                            <Button
                              type="button" className={channelBtnclass} onClick={() => dispatch(setActiveChannel(channel))}>
                              <span className="me-1">#</span>
                              {channel.name}
                            </Button>
                          </li>    
                        );
                      }
                      return (
                        <li key={channel.id} className="nav-item w-100">
                          <Dropdown as={ButtonGroup}>
                            <Button type="button" className={channelBtnclass} onClick={() => dispatch(setActiveChannel(channel))}>
                              <span className="me-1">#</span>
                              {channel.name}
                            </Button>
                            <Dropdown.Toggle split className={channelBtnclass} />
                            <Dropdown.Menu>
                              <Dropdown.Item href="#" onClick={() => showModal('removing', channel.id)}>Удалить</Dropdown.Item>
                              <Dropdown.Item href="#" onClick={() => showModal('renaming', channel.id)}>Переименовать</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </li>
                      );
                    })
                  }
                  </ul>
                </div>
                <div className="col p-0 h-100">
                  <div className="d-flex flex-column h-100">
                    <div className="bg-light mb-4 p-3 shadow-sm small">
                      <p className="m-0">
                        <b>{`# ${activeChannel.name}`}</b>
                      </p>
                      <span className="text-muted">{`${messagesCount} сообщений`}</span>
                    </div>
                    <div id="messages-box" className="chat-messages overflow-auto px-5">
                      {messages && messages.filter((message) => message.channelId === activeChannel.id).map((message) => {
                        return (<div key={message.id} className="text-break mb-2">
                          <b>{message.username}</b>
                          {`: ${message.body}`}
                        </div>)
                      })}
                    </div>
                    <div className="mt-auto px-5 py-3">
                      <form className="py-1 boarder rounded-2" onSubmit={handleSubmitMessage}>
                        <div className="input-group has-validation">
                          <input
                            name="body"
                            aria-label="Новое сообщение"
                            placeholder="Введите сообщение..."
                            className="border-0 p-0 ps-2 form-control"
                            value={newMessage}
                            onChange={(event) => setNewMessage(event.target.value)}
                            ></input>
                          <Button type="submit" className={messageBtnClass}>
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
      <div>
        {modalType && renderModal(modalType, handleAddChannel, hideModal, handleRenameChannel, handleDeleteChannel)}
      </div>
      </>
    );
  }
  return (
  <Navigate to='/login' state={{ from: location }} />
  );
};

export default MainPage;
