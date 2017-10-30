import React, {Component, PropTypes} from 'react'
import Modal from 'react-bootstrap-modal'
import './modal-sms-count.styl'

class SMSCount extends Component {
  cancel = () => this.props.handleModalSMSCount()
  render () {
    return (
      <Modal show={this.props.isVisibleModalSMSCount} dialogClassName='main-modal-dialog' onHide={this.cancel}>
        <Modal.Header>
          <h1 className={config.isRtL ? 'pd-r' : 'pd-l'}>{config.translations.failed_sent}</h1>
          <img className={config.isRtL ? 'left' : 'right'} src={config.urls.media + 'add.svg'} onClick={this.cancel} />
        </Modal.Header>
        <div id='SMSCount-body'>
          <h1>{config.translations.sms_exhausted}</h1>
        </div>
        <div id='SMSCount-footer'><Modal.Footer>
          <button className={config.isRtL ? 'radiusRight' : 'radiusLeft'} onClick={this.cancel}>{config.translations.back}</button>
          <button className={config.isRtL ? 'radiusLeft' : 'radiusRight'}>{config.translations.up_balance}</button>
        </Modal.Footer></div>
      </Modal>
    )
  }
}
SMSCount.propTypes = {
  isVisibleModalSMSCount: PropTypes.bool.isRequired,
  handleModalSMSCount: PropTypes.func.isRequired
}

export default SMSCount
