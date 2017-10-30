import React, {Component, PropTypes} from 'react'
import Modal from 'react-bootstrap-modal'
import './modal-success.styl'

class Success extends Component {
  cancel = () => this.props.handleModalSuccess()
  render () {
    return (
      <Modal show={this.props.isVisibleModalSuccess} dialogClassName='main-modal-dialog' onHide={this.cancel}>
        <div id='success-body'>
          <h1>{config.translations.success_sent}</h1>
        </div>
        <div id='success-footer'><Modal.Footer>
          <button onClick={this.cancel}>{config.translations.close}</button>
        </Modal.Footer></div>
      </Modal>
    )
  }
}
Success.propTypes = {
  isVisibleModalSuccess: PropTypes.bool.isRequired,
  handleModalSuccess: PropTypes.func.isRequired
}

export default Success
