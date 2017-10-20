import React, {Component, PropTypes} from 'react'
import Modal from 'react-bootstrap-modal'
import './modal-create.styl'

class Create extends Component {
  constructor () {
    super()
    this.state = {
      textRes: '',
      name: '',
      text: ''
    }
  }
  save = () => {
    Object.keys(config.translations.tags).map(i => {
      this.state.textRes = this.state.textRes.replace(new RegExp(config.translations.tags[i], 'gm'), '$$$' + i + '$$$')
    })
    config.templates.push({id: 123, name: this.state.name, text: this.state.textRes})
    this.cancel()
  }
  cancel = () => {
    this.setState({textRes: '', name: '', text: ''})
    this.props.handleCreateModal()
  }
  setCursor = () => {
    this.refs.text.focus()
    let range = document.createRange()
    range.setStart(this.refs.text.childNodes[this.refs.text.childNodes.length - 1], 1)
    range.collapse(true)
    let sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
  }
  getPosCursor = () => {
    this.refs.text.focus()
    console.log(window.getSelection().getRangeAt(0).startOffset)
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
    this.setState({text: this.state.text + this.checkStartSpace() +
      `<span class='tag' contenteditable='false' onclick='removeTag(this)'>${config.translations.tags[i]}</span>` + '&nbsp;'}, () => this.setCursor())
  }
  render () {
    // console.log('MAIN@' + this.state.text + '@', this.state.text.length)
    // console.log('RESULT@' + this.state.textRes + '@', this.state.textRes.length)
    return (
      <Modal show={this.props.isVisibleCreateModal} dialogClassName='main-modal-dialog' onHide={this.cancel}>
        <Modal.Header>
          <h1 className={config.isRtL ? 'pd-r' : 'pd-l'}>{config.translations.add_templates}</h1>
          <img className={config.isRtL ? 'left' : 'right'} src={config.urls.media + 'add.svg'} onClick={this.cancel} />
        </Modal.Header>
        <div id='create-body'>
          <h1 className='name'>{config.translations.name}</h1>
          <input type='text' value={this.state.name} placeholder={config.translations.name_placeholder}
            onChange={e => this.setState({name: e.target.value})} />
          <h1 className='text'>{config.translations.text}</h1>
          <div className='text-input' onBlur={e => this.setState({text: e.target.innerHTML, textRes: e.target.innerText})} ref='text' contentEditable
            dangerouslySetInnerHTML={{__html: this.state.text}} onKeyUp={e => this.setState({textRes: e.target.innerText})} />
          <h1 className='tags'>{config.translations.tags_label}</h1>
          {Object.keys(config.translations.tags).map(i => <button key={i} className='tag-list'
            onClick={() => this.addTag(i)}>{config.translations.tags[i]}</button>)}
        </div>
        <div id='create-footer'><Modal.Footer>
          <button className={config.isRtL ? 'radiusRight' : 'radiusLeft'} onClick={this.cancel}>{config.translations.cancel}</button>
          <button className={config.isRtL ? 'radiusLeft' : 'radiusRight'} onClick={this.save}>{config.translations.save}</button>
        </Modal.Footer></div>
        <button onClick={this.getPosCursor}>asdfasd</button>
      </Modal>
    )
  }
}
Create.propTypes = {
  isVisibleCreateModal: PropTypes.bool.isRequired,
  handleCreateModal: PropTypes.func.isRequired
}

export default Create
