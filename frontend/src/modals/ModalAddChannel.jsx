import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';

const ModalAddChannel = (props) => {
  const { onHide, handleAddChannel } = props;
  const f = useFormik({
    initialValues: 
      { channel: '' },
    onSubmit: (values) => {
      handleAddChannel(values.channel);
      onHide();
    },
  });
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
        <form onSubmit={f.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="channel"
              id="channel"
              className="mb-2"
              required
              value={f.values.channel}
              onChange={f.handleChange}
              ref={inputRef}
              type="text"
            />
            <Form.Label htmlFor="channel" className="visually-hidden">Имя канала</Form.Label>
            <Form.Control.Feedback type="invalid">От 3 до 20 символов</Form.Control.Feedback>
          </Form.Group>
          <Button type="button" className="btn btn-secondary me-2" onClick={onHide}>Отменить</Button>
          <Button type="submit" className="btn btn-primary">Отправить</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddChannel;
