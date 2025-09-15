import { Modal, Button } from 'react-bootstrap'
import { Formik, Form } from 'formik'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setActiveChannel } from '../Slices/channelsSlice'
import { useGetChannelsQuery } from '../services/channelsApi'

const ModalRemoveChannel = ({ modalType, onHide, handleDeleteChannel }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { data: channels } = useGetChannelsQuery()
  const handleSubmitForm = () => {
    handleDeleteChannel(modalType.item)
    onHide()
    dispatch(setActiveChannel(channels[0]))
  }
  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.remove.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channel: '' }}
          onSubmit={handleSubmitForm}
        >
          <Form>
            <p className="lead">{t('modals.remove.question')}</p>
            <div className="d-flex justify-content-end">
              <Button type="button" className="btn btn-secondary me-2" onClick={onHide}>{t('modals.cancelBtn')}</Button>
              <Button type="button" className="btn btn-danger" onClick={handleSubmitForm}>{t('modals.remove.submitBtn')}</Button>
            </div>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  )
}

export default ModalRemoveChannel
