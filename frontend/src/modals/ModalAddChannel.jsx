import React, { useEffect, useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Modal, Button } from 'react-bootstrap'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useGetChannelsQuery } from '../services/channelsApi.js'
import FilterContext from '../contexts/index.jsx'

const ModalAddChannel = ({ onHide, handleAddChannel }) => {
  const { t } = useTranslation()
  const filter = useContext(FilterContext)
  const { data: channels } = useGetChannelsQuery()
  const channelsNames = channels.map(ch => ch.name)
  const schema = Yup.object().shape({
    channel: Yup.string()
      .trim()
      .required()
      .min(3)
      .max(20)
      .notOneOf(channelsNames),
  })

  const handleSubmitForm = async (values, { setSubmitting }) => {
    try {
      const filteredValue = filter.clean(values.channel)
      await handleAddChannel(filteredValue)
      onHide()
    }
    catch (err) {
      setSubmitting(false)
      inputRef.current.select()
      throw err
    }
  }

  const inputRef = React.useRef()
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.headerAdd')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channel: '' }}
          validationSchema={schema}
          onSubmit={handleSubmitForm}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmitForm
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
                  touched.channel && errors.channel ? 'is-invalid' : ''
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
  )
}

ModalAddChannel.propTypes = {
  onHide: PropTypes.func,
  handleAddChannel: PropTypes.func,
}

export default ModalAddChannel
