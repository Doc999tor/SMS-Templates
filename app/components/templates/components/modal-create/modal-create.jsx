import {checkLength, replaceTags, Modal} from 'project-components'
import {templatePostService} from 'project-services'
import './modal-create.styl'

export default class Create extends React.Component {
  constructor () {
    super()
    this.state = {
      isActivePreview: false,
      preview: '',
      name: '',
      text: '',
      acces: (config.user.permission_level === 'senior' || config.user.permission_level === 'admin')
    }
  }
  save = () => {
    const text = replaceTags(this.state.text, true)
    const b = `name=${this.state.name}&text=${text}`
    templatePostService(b).then(r => {
      if (r.status === 201) {
        r.json().then(r => {
          config.templates.push({id: r, name: this.state.name, text})
          this.cancel()
        })
      }
    })
  }
  update = () => {
    config.templates[this.props.i].text = replaceTags(this.state.text, true)
    config.templates[this.props.i].name = this.state.name
    this.cancel()
  }
  cancel = () => {
    this.setState({name: '', text: ''})
    this.props.handleCreateModal()
    // document.location = document.referrer
  }
  setCursor = () => {
    this.refs.text.childNodes.forEach(i => {
      i.nodeValue === '' && i.parentNode.removeChild(i)
    })
    this.refs.text.focus()
    let range = document.createRange()
    range.setStart(this.refs.text.childNodes[this.refs.text.childNodes.length - 1], 1)
    range.collapse(true)
    let sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
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
    this.setState({text: this.state.text + config.translations.tags[i] + ' '})
    this.insertHTML(`<span class='tag' contenteditable='false' onclick=${this.state.acces ? 'removeTag(this)' : ''}>${config.translations.tags[i]}</span>` + ' ')
    this.setCursor()
  }
  init = () => {
    let button = this.refs.preview
    button.addEventListener('touchstart', e => {
      e.preventDefault()
      if (!this.state.isActivePreview) this.setState({preview: replaceTags(this.state.text, false), isActivePreview: true})
    }, false)
    button.addEventListener('touchend', e => {
      e.preventDefault()
      if (this.state.isActivePreview) this.setState({isActivePreview: false})
      this.refs.text.focus()
    }, false)
  }
  componentDidMount () {
    if (this.props.isEdit) {
      this.refs.text.innerHTML = config.templates[this.props.i].text.replace(/\$\$(?:\w+)\$\$/gm, i =>
        `<span class='tag' contenteditable='false' onclick=${this.state.acces ? 'removeTag(this)' : ''}>${config.translations.tags[i.slice(2, -2)]}</span>`)
      this.setState({name: config.templates[this.props.i].name, text: this.refs.text.innerText})
    }
  }
  componentDidUpdate = () => this.props.isVisibleCreateModal && this.init()
  render () {
    let lenght = checkLength(this.state.text)
    return (
      <Modal show={this.props.isVisibleCreateModal} dialogClassName='main-modal-dialog' onHide={this.cancel}>
        <div className='create-header'>
          <h1 className={config.isRtL ? 'pd-r' : 'pd-l'}>{this.props.isEdit ? config.translations.edit_template : config.translations.add_template}</h1>
          <img className={config.isRtL ? 'left' : 'right'} src={config.urls.media + 'add.svg'} onClick={this.cancel} />
        </div>
        <div className='create-body'>
          <div className={this.state.isActivePreview ? 'hidden' : 'create ' + (lenght.isOk ? 'ch445' : 'ch420')}>
            <h1 className='name'>{config.translations.title}</h1>
            <input type='text' value={this.state.name} placeholder={config.translations.title_pl}
              disabled={!this.state.acces} onChange={e => this.setState({name: e.target.value})} />
            <h1 className='text'>{config.translations.content}</h1>
            <div className='text-input' id='main_text_input' ref='text' contentEditable={this.state.acces} placeholder={config.translations.message_pl}
              onBlur={e => this.setState({text: e.target.innerText})}
              onFocus={e => this.setState({text: e.target.innerText})}
              onKeyUp={e => this.setState({text: e.target.innerText})}
              // onClick={e => this.setState({text: e.target.innerText})}
            />
            <h1 className='counter'>{lenght.str}</h1>
            <h1 className={lenght.isOk ? 'message' : 'hidden'}>{config.translations.message.replace('{pages}', config.max_sms_pages)}</h1>
            <h1 className='tags'>{config.translations.tags_label}</h1>
            {Object.keys(config.translations.tags).map(i => <button key={i} className='tag-list'
              onClick={() => { this.state.acces && this.addTag(i) }}>{config.translations.tags[i]}</button>)}
          </div>
          <div className={this.state.isActivePreview ? 'preview-content ' + (lenght.isOk ? 'ch445' : 'ch420') : 'hidden'}>
            <div className='content'>{this.state.preview}</div>
            <h1 className='counter'>{lenght.str}</h1>
            <h1 className={lenght.isOk ? 'message' : 'hidden'}>{config.translations.message.replace('{pages}', config.max_sms_pages)}</h1>
          </div>
          <div className='preview-wrap'>
            <button className={'preview ' + (this.state.isActivePreview && 'preview-active')} ref='preview'>{config.translations.preview}<img src={config.urls.media + 'eye.png'} /></button>
          </div>
        </div>
        <div className='create-footer'>
          <button className={config.isRtL ? 'radiusRight' : 'radiusLeft'} onClick={this.cancel}>{config.translations.cancel}</button>
          <button className={config.isRtL ? 'radiusLeft' : 'radiusRight'} disabled={!this.state.acces}
            onClick={this.props.isEdit ? this.update : this.save}>{config.translations.save}</button>
        </div>
      </Modal>
    )
  }
}
Create.propTypes = {
  isVisibleCreateModal: PropTypes.bool.isRequired,
  handleCreateModal: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  i: PropTypes.number
}
