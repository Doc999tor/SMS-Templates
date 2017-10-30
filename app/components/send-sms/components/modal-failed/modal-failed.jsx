import React, {Component, PropTypes} from 'react'
import Modal from 'react-bootstrap-modal'
import './modal-failed.styl'

class Failed extends Component {
  cancel = () => this.props.handleModalFailed()
  render () {
    return (
      <Modal show={this.props.isVisibleModalFailed} dialogClassName='main-modal-dialog' onHide={this.cancel}>
        <Modal.Header>
          <h1 className={config.isRtL ? 'pd-r' : 'pd-l'}>{config.translations.failed_sent}</h1>
          <img className={config.isRtL ? 'left' : 'right'} src={config.urls.media + 'add.svg'} onClick={this.cancel} />
        </Modal.Header>
        <div id='failed-body'>
          <h1>{config.translations.failed_sent_message}</h1>
        </div>
        <div id='failed-footer'><Modal.Footer>
          <button onClick={this.cancel}>{config.translations.retry}</button>
        </Modal.Footer></div>
      </Modal>
    )
  }
}
Failed.propTypes = {
  isVisibleModalFailed: PropTypes.bool.isRequired,
  handleModalFailed: PropTypes.func.isRequired
}

export default Failed
