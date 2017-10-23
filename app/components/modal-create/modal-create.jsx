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
  save = () => {
    Object.keys(config.translations.tags).map(i => {
      this.state.text = this.state.text.replace(new RegExp(config.translations.tags[i], 'gm'), '$$$' + i + '$$$')
    })
    config.templates.push({id: 123, name: this.state.name, text: this.state.text})
    this.cancel()
  }
  cancel = () => {
    this.setState({name: '', text: ''})
    this.props.handleCreateModal()
  }
  insertHTML = p => {
    this.refs.text.focus()
    let selection = window.getSelection()
    let range = selection.getRangeAt(0)
    let temp = document.createElement('div')
    let insertion = document.createDocumentFragment()
    temp.innerHTML = p
    while (temp.firstChild) {
      insertion.appendChild(temp.firstChild)
    }
    range.deleteContents()
    range.insertNode(insertion)
  }
  addTag = i => {
    this.insertHTML(`<span class='tag' contenteditable='false' onclick='removeTag(this)'>${config.translations.tags[i]}</span>` + '&nbsp;')
    this.setState({text: this.state.text + config.translations.tags[i] + ' '})
    this.refs.text.focus()
  }
  render () {
    console.log('TEXT', this.state.text)
    return (
      <Modal show={this.props.isVisibleCreateModal} dialogClassName='main-modal-dialog' onHide={this.cancel}>
        <Modal.Header>
          <h1 className={config.isRtL ? 'pd-r' : 'pd-l'}>{config.translations.add_templates}</h1>
          <img className={config.isRtL ? 'left' : 'right'} src={config.urls.media + 'add.svg'} onClick={this.cancel} />
        </Modal.Header>
        <div id='create-body'>
          <h1 className='name'>{config.translations.title}</h1>
          <input type='text' value={this.state.name} placeholder={config.translations.title_pl}
            onChange={e => this.setState({name: e.target.value})} />
          <h1 className='text'>{config.translations.content}</h1>
          <div className='text-input' ref='text' contentEditable onBlur={e => this.setState({text: e.target.innerText})}
            onKeyUp={e => this.setState({text: e.target.innerText})} placeholder={config.translations.message_pl} />
          <h1 className='counter'>{'Used:' + this.state.text.length}</h1>
          <h1 className='tags'>{config.translations.tags_label}</h1>
          {Object.keys(config.translations.tags).map(i => <button key={i} className='tag-list'
            onClick={() => this.addTag(i)}>{config.translations.tags[i]}</button>)}
        </div>
        <div id='create-footer'><Modal.Footer>
          <button className={config.isRtL ? 'radiusRight' : 'radiusLeft'} onClick={this.cancel}>{config.translations.cancel}</button>
          <button className={config.isRtL ? 'radiusLeft' : 'radiusRight'} onClick={this.save}>{config.translations.save}</button>
        </Modal.Footer></div>
      </Modal>
    )
  }
}
Create.propTypes = {
  isVisibleCreateModal: PropTypes.bool.isRequired,
  handleCreateModal: PropTypes.func.isRequired
}

export default Create
