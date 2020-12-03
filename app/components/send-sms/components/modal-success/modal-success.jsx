import Modal from 'project-components/Modal/Modal.jsx'
import './modal-success.styl'

const Success = ({isVisibleModalSuccess, handleModalSuccess}) => {
  const cancel = () => handleModalSuccess()
  return (
    <Modal show={isVisibleModalSuccess} dialogClassName='main-modal-dialog' onHide={cancel}>
      <div className='success-body'>
        <h1>{config.translations.success_sent}</h1>
      </div>
      <div className='success-footer'>
        <button onClick={cancel}>{config.translations.close}</button>
      </div>
    </Modal>
  )
}
Success.propTypes = {
  isVisibleModalSuccess: PropTypes.bool.isRequired,
  handleModalSuccess: PropTypes.func.isRequired
}
export default Success
