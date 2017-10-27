import React, {Component, PropTypes} from 'react'
import Modal from 'react-bootstrap-modal'
import './modal-delete.styl'

class Delete extends Component {
  delete = () => {
    config.templates.splice(this.props.i, 1)
    this.cancel()
  }
  cancel = () => this.props.handleConfirmedModal()
  render () {
    return (
      <Modal show={this.props.isVisibleModalConfirmed} dialogClassName='main-modal-dialog' onHide={this.cancel}>
        <Modal.Header>
          <h1 className={config.isRtL ? 'pd-r' : 'pd-l'} >{config.translations.delete_tem}</h1>
          <img className={config.isRtL ? 'left' : 'right'} src={config.urls.media + 'add.svg'} onClick={this.cancel} />
        </Modal.Header>
        <div id='delete-body'>
          <h1>{config.translations.del_template}</h1>
          <button onClick={this.delete}>{config.translations.delete}</button>
        </div>
      </Modal>
    )
  }
}
Delete.propTypes = {
  isVisibleModalConfirmed: PropTypes.bool.isRequired,
  handleConfirmedModal: PropTypes.func.isRequired,
  i: PropTypes.number
}

export default Delete
