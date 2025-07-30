import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';

const ModalAddChannel = (props) => {
  const f = useFormik({
    initialValues: 
      { channel: '' },
    onSubmit: (values) => {},
  });
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <Modal show>
      <Modal.Header>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={f.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="name"
              id="name"
              className="mb-2"
              value={f.values.channel}
              onChange={f.handleChange}
              ref={inputRef}
            />
            <Form.Label></Form.Label>
            <Form.Control.Feedback type="invalid">От 3 до 20 символов</Form.Control.Feedback>
          </Form.Group>
          <Button type="button" className="btn btn-secondary me-2">Отменить</Button>
          <Button type="submit" className="btn btn-primary">Отправить</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddChannel;
