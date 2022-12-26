import Modal from 'project-components/Modal/Modal.jsx'
import './modal-delete.styl'

const Delete = ({isVisibleModalConfirmed, handleConfirmedModal, i}) => {
  const del = () => {
    config.templates.splice(i, 1)
    cancel()
  }
  const cancel = () => handleConfirmedModal()
  return (
    <Modal show={isVisibleModalConfirmed} dialogClassName='main-modal-dialog' onHide={cancel}>
      <div className='delete-header'>
        <h1 className={config.isRTL ? 'pd-r' : 'pd-l'} >{config.translations.delete_tem}</h1>
        <img className={config.isRTL ? 'left' : 'right'} src={config.urls.media + 'add.svg'} onClick={cancel} />
      </div>
      <div className='delete-body'>
        <h1>{config.translations.del_template}</h1>
        <button onClick={del}>{config.translations.delete}</button>
      </div>
    </Modal>
  )
}
Delete.propTypes = {
  isVisibleModalConfirmed: PropTypes.bool.isRequired,
  handleConfirmedModal: PropTypes.func.isRequired,
  i: PropTypes.number
}
export default Delete
