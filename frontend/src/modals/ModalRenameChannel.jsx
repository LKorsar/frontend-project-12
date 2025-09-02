import React, { useEffect, useRef, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useGetChannelsQuery } from '../services/channelsApi';
import FilterContext from '../contexts';

const ModalRenameChannel = ({ modalType, onHide, handleRenameChannel }) => {
  const { t } = useTranslation();
  const filter = useContext(FilterContext);
  const { data: channels } = useGetChannelsQuery();
  const channelsNames = channels.map((ch) => ch.name);
  const currentChannel = channels.filter((ch) => ch.id === modalType.item);
  const curChannelName = currentChannel[0].name;
  const schema = Yup.object().shape({
    channel: Yup.string()
      .trim()
      .required()
      .min(3)
      .max(20)
      .notOneOf(channelsNames),
  });
  
  const handleSubmitForm = (values, { setSubmitting }) => {
    try {
      const filteredValue = filter.clean(values.channel);
      handleRenameChannel(modalType.item, filteredValue);
      onHide();
    } catch (err) {
      setSubmitting(false);
      inputRef.current.select();
      throw err;
    }
  };
  
  const inputRef = useRef();
    useEffect(() => {
      inputRef.current.select();
  }, []);
  
  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.headerEdit')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channel: curChannelName }}
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
            <label htmlFor="channel" className="visually-hidden">{t('modals.chName')}</label>
            <ErrorMessage
              component="div"
              name="channel"
              className="invalid-feedback"
            />
            <Button type="button" className="btn btn-secondary me-2" onClick={onHide}>{t('modals.cancelBtn')}</Button>
            <Button type="submit" className="btn btn-primary">{t('modals.submitBtn')}</Button>
          </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

ModalRenameChannel.propTypes = {
  modalType: PropTypes.object,
  onHide: PropTypes.func,
  handleRenameChannel: PropTypes.func,
};

export default ModalRenameChannel;