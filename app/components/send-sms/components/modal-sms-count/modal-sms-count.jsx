import {Modal} from 'project-components'
import './modal-sms-count.styl'

const SMSCount = ({isVisibleModalSMSCount, handleModalSMSCount}) => {
  const cancel = () => handleModalSMSCount()
  return (
    <Modal show={isVisibleModalSMSCount} dialogClassName='main-modal-dialog' onHide={cancel}>
      <div className='SMSCount-header'>
        <h1 className={config.isRtL ? 'pd-r' : 'pd-l'}>{config.translations.failed_sent}</h1>
        <img className={config.isRtL ? 'left' : 'right'} src={config.urls.media + 'add.svg'} onClick={cancel} />
      </div>
      <div className='SMSCount-body'>
        <h1>{config.translations.sms_exhausted}</h1>
      </div>
      <div className='SMSCount-footer'>
        <button className={config.isRtL ? 'radiusRight' : 'radiusLeft'} onClick={cancel}>{config.translations.back}</button>
        <button className={config.isRtL ? 'radiusLeft' : 'radiusRight'}>{config.translations.up_balance}</button>
      </div>
    </Modal>
  )
}
SMSCount.propTypes = {
  isVisibleModalSMSCount: PropTypes.bool.isRequired,
  handleModalSMSCount: PropTypes.func.isRequired
}
export default SMSCount
