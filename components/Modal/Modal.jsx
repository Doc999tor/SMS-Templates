import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './Modal.styl'

class Modal extends Component {
  constructor () {
    super()
    this.state = {
      flag: false
    }
  }
  componentDidUpdate () {
    if (this.props.show && !this.state.flag) {
      setTimeout(() => { this.setState({flag: true}) }, 1)
    }
    if (!this.props.show && this.state.flag) {
      this.setState({flag: false})
    }
  }
  render () {
    return (
      <div id={this.props.show ? 'modal-dialog' : 'hidden'} className={this.state.flag ? 'fadetyu' : ''}
        onClick={this.props.onHide} >
        <div id='modal-content' className={this.state.flag ? 'fadeqwe' : ''} onClick={e => e.stopPropagation()}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
Modal.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.any
}

export default Modal
