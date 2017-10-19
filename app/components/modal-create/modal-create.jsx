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
  removeTag = () => {
    this.refs.text.removeChild(this.refs.text.childNodes[1])
    // this.delSpace()
  }
  setCursor = () => {
    this.refs.text.focus()
    let range = document.createRange()
    range.setStart(this.refs.text.childNodes[this.refs.text.childNodes.length - 1], 1)
    range.collapse(true)
    let sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
    console.log(this.refs.text.childNodes)
  }
  checkStartSpace = () => {
    if (this.state.text.slice(-6) === '&nbsp;' || this.state.text.length === 0) {
      return ''
    } else {
      return '&nbsp;'
    }
  }
  delSpace = async () => {
    if (this.state.text.slice(-7) === ' &nbsp;') {
      await this.setState({text: this.state.text.slice(0, -7)}, () => this.delSpace())
    } else if (this.state.text.slice(-6) === '&nbsp;') {
      await this.setState({text: this.state.text.slice(0, -6)}, () => this.delSpace())
    }
  }
  addTag = async i => {
    await this.delSpace()
    this.setState({text: this.state.text + this.checkStartSpace() + `<span class='tag' onclick='removeTag(this)'>${config.translations.tags[i]}</span>` + '&nbsp;'}, () => this.setCursor())
  }
  render () {
    console.log('MAIN@' + this.state.text + '@', this.state.text.length)
    return (
      // ={this.props.isVisibleCreateModal}
      <Modal show dialogClassName='main-modal-dialog' onHide={this.cancel}>
        <Modal.Header>
          <h1 className={config.isRtL ? 'pd-r' : 'pd-l'}>{config.translations.add_templates}</h1>
          <img className={config.isRtL ? 'left' : 'right'} src={config.urls.media + 'add.svg'} onClick={this.cancel} />
        </Modal.Header>
        <div id='create-body'>
          <h1 className='name'>{config.translations.name}</h1>
          <input type='text' value={this.state.name} onChange={e => this.setState({name: e.target.value})} placeholder={config.translations.name_placeholder} />
          <h1 className='text'>{config.translations.text}</h1>
          <div className='text-input' contentEditable onBlur={e => this.setState({text: e.target.innerHTML})} ref='text'
            dangerouslySetInnerHTML={{__html: this.state.text}} onClick={this.delSpace} />
          <h1 className='tags'>{config.translations.tags_label}</h1>
          {Object.keys(config.translations.tags).map(i => <button key={i} className='tag-list' onClick={() => this.addTag(i)}>{config.translations.tags[i]}</button>)}
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
