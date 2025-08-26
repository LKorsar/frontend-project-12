import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setActiveChannel } from '../Slices/channelsSlice';
import { useGetChannelsQuery } from '../services/channelsApi';

const ModalRemoveChannel = ({ modalType, onHide, handleDeleteChannel }) => {
  const dispatch = useDispatch();
  const { data: channels } = useGetChannelsQuery();
  const handleSubmitForm = () => {
    handleDeleteChannel(modalType.item);
    onHide();
    dispatch(setActiveChannel(channels[0]));
  };
  return (
      <Modal show>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ channel: '' }}
            onSubmit={handleSubmitForm}
          >
            <Form>
              <p className="lead">Уверены?</p>
              <div className="d-flex justify-content-end">
                <Button type="button" className="btn btn-secondary me-2" onClick={onHide}>Отменить</Button>
                <Button type="button" className="btn btn-danger" onClick={handleSubmitForm}>Удалить</Button>
              </div>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    );
};

ModalRemoveChannel.propTypes = {
  modalType: PropTypes.object,
  onHide: PropTypes.func,
  handleDeleteChannel: PropTypes.func,
};

export default ModalRemoveChannel;