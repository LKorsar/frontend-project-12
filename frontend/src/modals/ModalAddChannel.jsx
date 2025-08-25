import React, { useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useGetChannelsQuery } from '../services/channelsApi.js';
import { setActiveChannel } from '../Slices/channelsSlice.js';

const ModalAddChannel = ({ onHide, handleAddChannel }) => {
  const dispatch = useDispatch();
  const { data: channels, refetch: refetchChannels } = useGetChannelsQuery();
  const channelsNames = channels.map((ch) => ch.name);
  const schema = Yup.object().shape({
    channel: Yup.string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelsNames, 'Должно быть уникальным'),
  });

  const handleSubmitForm = async (values, { setSubmitting }) => {
    try {
      await handleAddChannel(values.channel);
      refetchChannels();
      if (channels && channels.length > 0) {
      dispatch(setActiveChannel(channels[channels.length - 1]));
      onHide();
      }
      onHide();
    } catch (err) {
      setSubmitting(false);
      inputRef.current.select();
      throw err;
    }
  };

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channel: '' }}
          validationSchema={schema}
          onSubmit={handleSubmitForm}
          onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmitForm;
              }
            }}
        >
          {({ errors, touched }) => (
          <Form>
            <Field
              name="channel"
              id="channel"
              type="text"
              className={`form-control ${
               touched.channel && errors.channel ? "is-invalid" : ""
              } mb-2`}
              ref={inputRef}
            />
            <label htmlFor="channel" className="visually-hidden">Имя канала</label>
            <ErrorMessage
              component="div"
              name="channel"
              className="invalid-feedback"
            />
            <Button type="button" className="btn btn-secondary me-2" onClick={onHide}>Отменить</Button>
            <Button type="submit" className="btn btn-primary">Отправить</Button>
          </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddChannel;
