import Create from '../modal-create/modal-create.jsx'
import React, {Component} from 'react'
import './topnav.styl'

class Topnav extends Component {
  constructor () {
    super()
    this.state = {
      isVisibleCreateModal: false
    }
  }
  handleCreateModal = () => this.setState({isVisibleCreateModal: !this.state.isVisibleCreateModal})
  render () {
    return (
      <div id='topnav'>
        <Create handleCreateModal={this.handleCreateModal} isVisibleCreateModal={this.state.isVisibleCreateModal} />
        <div className='header'>
          <div className={'icons-l ' + (config.isRtL ? 'right' : 'left')}>
            <div className={'icon ' + (config.isRtL ? 'right' : 'left')} onClick={() => { window.history.go(-1) }}><img className={'arrow-back ' + (config.isRtL && 'arrow-back-mr')} src={config.urls.media + 'arrow-back.svg'} /></div>
          </div>
          <div className='reminders'><h1>{config.translations.templates}</h1></div>
          <div className={'icons-r ' + (config.isRtL ? 'left' : 'right')}>
            <div className='icon'><img className='add' src={config.urls.media + 'add.svg'} onClick={this.handleCreateModal} /></div>
            <div className='icon'><img className='more' src={config.urls.media + 'more.svg'} /></div>
          </div>
        </div>
      </div>
    )
  }
}
export default Topnav
