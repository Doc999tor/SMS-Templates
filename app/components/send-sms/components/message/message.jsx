import Templates from '../modal-templates/modal-templates.jsx'
import SMSCount from '../modal-sms-count/modal-sms-count.jsx'
import {checkLength, replaceTags} from 'project-components'
import Success from '../modal-success/modal-success.jsx'
import Failed from '../modal-failed/modal-failed.jsx'
import './message.styl'

export default class Message extends React.Component {
  constructor () {
    super()
    this.state = {
      isVisibleModalTemplates: false,
      isVisibleModalSMSCount: false,
      isVisibleModalSuccess: false,
      isVisibleModalFailed: false,
      isActivePreview: false,
      preview: '',
      text: ''
    }
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
    this.insertHTML(`<span class='tag' contenteditable='false' onclick='removeTag(this)'>${config.translations.tags[i]}</span>` + ' ')
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
      if (this.state.isActivePreview) this.setState({isActivePreview: false})
      this.refs.text_send.focus()
    }, false)
  }
  getTemplate = p => {
    this.refs.text_send.innerHTML = p.replace(/\$\$(?:\w+)\$\$/gm, i =>
      `<span class='tag' contenteditable='false' onclick='removeTag(this)'>${config.translations.tags[i.slice(2, -2)]}</span>`)
    this.setState({text: this.refs.text_send.innerText})
  }
  handleModalTemplates = () => this.setState({isVisibleModalTemplates: !this.state.isVisibleModalTemplates})
  handleModalSMSCount = () => this.setState({isVisibleModalSMSCount: !this.state.isVisibleModalSMSCount})
  handleModalSuccess = () => this.setState({isVisibleModalSuccess: !this.state.isVisibleModalSuccess})
  handleModalFailed = () => this.setState({isVisibleModalFailed: !this.state.isVisibleModalFailed})
  componentDidMount = () => this.init()
  render () {
    let lenght = checkLength(this.state.text)
    return (
      <div id='message'>
        <Templates isVisibleModalTemplates={this.state.isVisibleModalTemplates} handleModalTemplates={this.handleModalTemplates} getTemplate={this.getTemplate} />
        <SMSCount isVisibleModalSMSCount={this.state.isVisibleModalSMSCount} handleModalSMSCount={this.handleModalSMSCount} />
        <Success isVisibleModalSuccess={this.state.isVisibleModalSuccess} handleModalSuccess={this.handleModalSuccess} />
        <Failed isVisibleModalFailed={this.state.isVisibleModalFailed} handleModalFailed={this.handleModalFailed} />
        <div className={this.state.isActivePreview ? 'hidden' : 'message ' + (lenght.isOk ? 'ch475' : 'ch450')}>
          <div className='load-templates'>
            <button onClick={this.handleModalTemplates}>{config.translations.load_template}</button>
          </div>
          <h1>{config.translations.message_text}</h1>
          <div className='text-input' id='main_text_input' ref='text_send' contentEditable onBlur={e => this.setState({text: e.target.innerText})}
            onKeyUp={e => this.setState({text: e.target.innerText})} placeholder={config.translations.message_pl_send_sms}
            onClick={e => this.setState({text: e.target.innerText})} />
          <h1 className='counter'>{lenght.str}</h1>
          <h1 className={lenght.isOk ? 'message-text' : 'hidden'}>{config.translations.message.replace('{pages}', config.max_sms_pages)}</h1>
          <h1 className='tags'>{config.translations.tags_label}</h1>
          {Object.keys(config.translations.tags).map(i => <button key={i} className='tag-list'
            onClick={() => this.addTag(i)}>{config.translations.tags[i]}</button>)}
        </div>
        <div className={this.state.isActivePreview ? 'preview-content ' + (lenght.isOk ? 'ch475' : 'ch450') : 'hidden'}>
          <div className='content'>{this.state.preview}</div>
          <h1 className='counter'>{lenght.str}</h1>
          <h1 className={lenght.isOk ? 'message-text' : 'hidden'}>{config.translations.message.replace('{pages}', config.max_sms_pages)}</h1>
        </div>
        <div className='preview-wrap'>
          <button className={'preview ' + (this.state.isActivePreview && 'preview-active')} ref='preview_send'>{config.translations.preview}<img src={config.urls.media + 'eye.png'} /></button>
        </div>
        <div className='buttons'>
          <button className='cancel' onClick={() => window.history.go(-1)}>{config.translations.cancel}</button>
          <button className='send' onClick={this.handleModalSuccess}>{config.translations.send}</button>
        </div>
      </div>
    )
  }
}
