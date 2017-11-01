import {Modal} from 'project-components'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './modal-sms-count.styl'

class SMSCount extends Component {
  cancel = () => this.props.handleModalSMSCount()
  render () {
    return (
      <Modal show={this.props.isVisibleModalSMSCount} dialogClassName='main-modal-dialog' onHide={this.cancel}>
        <div className='SMSCount-header'>
          <h1 className={config.isRtL ? 'pd-r' : 'pd-l'}>{config.translations.failed_sent}</h1>
          <img className={config.isRtL ? 'left' : 'right'} src={config.urls.media + 'add.svg'} onClick={this.cancel} />
        </div>
        <div className='SMSCount-body'>
          <h1>{config.translations.sms_exhausted}</h1>
        </div>
        <div className='SMSCount-footer'>
          <button className={config.isRtL ? 'radiusRight' : 'radiusLeft'} onClick={this.cancel}>{config.translations.back}</button>
          <button className={config.isRtL ? 'radiusLeft' : 'radiusRight'}>{config.translations.up_balance}</button>
        </div>
      </Modal>
    )
  }
}
SMSCount.propTypes = {
  isVisibleModalSMSCount: PropTypes.bool.isRequired,
  handleModalSMSCount: PropTypes.func.isRequired
}

export default SMSCount
