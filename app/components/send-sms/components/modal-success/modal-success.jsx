import {Modal} from 'project-components'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './modal-success.styl'

class Success extends Component {
  cancel = () => this.props.handleModalSuccess()
  render () {
    return (
      <Modal show={this.props.isVisibleModalSuccess} dialogClassName='main-modal-dialog' onHide={this.cancel}>
        <div className='success-body'>
          <h1>{config.translations.success_sent}</h1>
        </div>
        <div className='success-footer'>
          <button onClick={this.cancel}>{config.translations.close}</button>
        </div>
      </Modal>
    )
  }
}
Success.propTypes = {
  isVisibleModalSuccess: PropTypes.bool.isRequired,
  handleModalSuccess: PropTypes.func.isRequired
}

export default Success
