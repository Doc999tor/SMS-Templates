import {checkLength, replaceTags} from 'project-components'
import React, {Component} from 'react'
import './message.styl'

class Message extends Component {
  constructor () {
    super()
    this.state = {
      isActivePreview: false,
      preview: '',
      text: ''
    }
  }
  cancel = () => {
    this.setState({text: ''})
  }
  setCursor = () => {
    this.refs.text_send.childNodes.forEach(i => {
      i.nodeValue === '' && i.parentNode.removeChild(i)
    })
    this.refs.text_send.focus()
    let range = document.createRange()
    range.setStart(this.refs.text_send.childNodes[this.refs.text_send.childNodes.length - 1], 1)
    range.collapse(true)
    let sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
  }
  insertHTML = p => {
    this.refs.text_send.focus()
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
    this.setState({text: this.state.text + config.translations.tags[i] + ' '})
    this.insertHTML(`<span class='tag' contenteditable='false' onclick='removeTag(this)'>${config.translations.tags[i]}</span>` + '&nbsp;')
    this.setCursor()
  }
  init = () => {
    let button = this.refs.preview_send
    button.addEventListener('touchstart', e => {
      e.preventDefault()
      if (!this.state.isActivePreview) this.setState({preview: replaceTags(this.state.text, false), isActivePreview: true})
    }, false)
    button.addEventListener('touchend', e => {
      e.preventDefault()
      if (this.state.iremoveTagsActivePreview) this.setState({isActivePreview: false})
    }, false)
  }
  componentDidMount = () => this.init()
  render () {
    let lenght = checkLength(this.state.text)
    return (
      <div id='message'>
        <div className={this.state.isActivePreview ? 'hidden' : 'message ' + (lenght.isOk ? 'ch445' : 'ch420')}>
          <div className='load-templates'>
            <button>{config.translations.load_template}</button>
          </div>
          <h1>{config.translations.message_text}</h1>
          <div className='text-input' id='main_text_input' ref='text_send' contentEditable onBlur={e => this.setState({text: e.target.innerText})}
            onKeyUp={e => this.setState({text: e.target.innerText})} placeholder={config.translations.message_pl}
            onClick={e => this.setState({text: e.target.innerText})} />
          <h1 className='counter'>{lenght.str}</h1>
          <h1 className={lenght.isOk ? 'message-text' : 'hidden'}>{config.translations.message.replace('{pages}', config.max_sms_pages)}</h1>
          <h1 className='tags'>{config.translations.tags_label}</h1>
          {Object.keys(config.translations.tags).map(i => <button key={i} className='tag-list'
            onClick={() => this.addTag(i)}>{config.translations.tags[i]}</button>)}
        </div>
        <div className={this.state.isActivePreview ? 'preview-content ' + (lenght.isOk ? 'ch445' : 'ch420') : 'hidden'}>
          <div className='content'>{this.state.preview}</div>
          <h1 className='counter'>{lenght.str}</h1>
          <h1 className={lenght.isOk ? 'message-text' : 'hidden'}>{config.translations.message.replace('{pages}', config.max_sms_pages)}</h1>
        </div>
        <div className='preview-wrap'>
          <button className='preview' ref='preview_send'>{config.translations.preview}<img src={config.urls.media + 'eye.png'} /></button>
        </div>
        <div className='buttons'>
          <button>{}</button>
          <button>{}</button>
        </div>
      </div>
    )
  }
}
export default Message
