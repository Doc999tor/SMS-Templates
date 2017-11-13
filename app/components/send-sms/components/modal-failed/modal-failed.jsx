import {Modal} from 'project-components'
import './modal-failed.styl'

const Failed = ({isVisibleModalFailed, handleModalFailed}) => {
  const cancel = () => handleModalFailed()
  return (
    <Modal show={isVisibleModalFailed} dialogClassName='main-modal-dialog' onHide={cancel}>
      <div className='failed-header'>
        <h1 className={config.isRtL ? 'pd-r' : 'pd-l'}>{config.translations.failed_sent}</h1>
        <img className={config.isRtL ? 'left' : 'right'} src={config.urls.media + 'add.svg'} onClick={cancel} />
      </div>
      <div className='failed-body'>
        <h1>{config.translations.failed_sent_message}</h1>
      </div>
      <div className='failed-footer'>
        <button onClick={cancel}>{config.translations.retry}</button>
      </div>
    </Modal>
  )
}
Failed.propTypes = {
  isVisibleModalFailed: PropTypes.bool.isRequired,
  handleModalFailed: PropTypes.func.isRequired
}
export default Failed
