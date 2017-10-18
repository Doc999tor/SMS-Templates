import React, {Component, PropTypes} from 'react'
import Modal from 'react-bootstrap-modal'
import './modal-create.styl'

class Create extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      text: ''
    }
  }
  save = async () => {

  }
  cancel = () => {
    this.props.handleCreateModal()
  }
  render () {
    return (
      <Modal show={this.props.isVisibleCreateModal} dialogClassName='main-modal-dialog' onHide={this.cancel}>
        <Modal.Header>
          <h1 className={config.isRtL ? 'pd-r' : 'pd-l'}>{config.translations.add_templates}</h1>
          <img className={config.isRtL ? 'left' : 'right'} src={config.urls.media + 'add.svg'} onClick={this.cancel} />
        </Modal.Header>
        <div id='create-body'>
          <h1 className='name'>{config.translations.name}</h1>
          <input type='text' value={this.state.name} onChange={e => this.setState({name: e.target.value})} placeholder={config.translations.name_placeholder} />
          <h1 className='text'>{config.translations.text}</h1>
          <div className='text-input' contentEditable onKeyPress={e => {
            this.setState({text: e.target.innerHTML})
            console.log('state', this.state.text)
            console.log('event', e.target.innerHTML)
          }}>{this.state.text}</div>
          <h1 className='tags'>{config.translations.tags_label}</h1>
          {Object.keys(config.translations.tags).map(i => <button key={i} className='tag' onClick={() => this.setState({text: this.state.text + ' ' + config.translations.tags[i]})}>{config.translations.tags[i]}</button>)}
        </div>
      </Modal>
    )
  }
}
Create.propTypes = {
  isVisibleCreateModal: PropTypes.bool.isRequired,
  handleCreateModal: PropTypes.func.isRequired
}

export default Create
