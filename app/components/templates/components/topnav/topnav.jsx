import AccessRights from '../../../access-rights/access-rights.jsx'
import Create from '../modal-create/modal-create.jsx'
import { Menu } from 'project-components'
import './topnav.styl'

class Topnav extends React.Component {
  static propTypes = {
    rights: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired
  }
  state = {
    isVisibleCreateModalContex: false,
    isVisibleCreateModal: false
  }
  handleCreateModal = () => {
    this.setState({isVisibleCreateModal: !this.state.isVisibleCreateModal})
    if (this.state.isVisibleCreateModalContex) setTimeout(() => this.setState({isVisibleCreateModalContex: false}), 300)
    else this.setState({isVisibleCreateModalContex: true})
    this.props.update()
  }

  menuOnOff = () => {
    this.setState(state => ({
      isActive: !state.isActive
    }))
    document.querySelector('body').classList.toggle('no-scroll')
  }

  closeMenu = () => {
    this.setState({ isActive: false })
    document.querySelector('body').classList.remove('no-scroll')
  }

  render () {
    return (
      <div id='topnav'>
        {this.state.isVisibleCreateModalContex &&
          <Create handleCreateModal={this.handleCreateModal} isVisibleCreateModal={this.state.isVisibleCreateModal} />}
        <div className='header'>
          <div className={'icons-l ' + (config.isRTL ? 'right' : 'left')}>
            <div className={'icon ' + (config.isRTL ? 'right' : 'left')} onClick={() => window.history.go(-1)}>
              <img className={'arrow-back ' + (config.isRTL && 'arrow-back-mr')} src={config.urls.media + 'arrow-back.svg'} /></div>
          </div>
          <div className='reminders'><h1>{config.translations.templates}</h1></div>
          <div className={'icons-r ' + (config.isRTL ? 'left' : 'right')}>
            <div className='icon'>
              {this.props.rights.add &&
                <img className='add' src={config.urls.media + 'add.svg'} onClick={this.handleCreateModal} />}
            </div>
            <div className='icon' onClick={this.menuOnOff}><img className='more' src={config.urls.media + 'more.svg'} /></div>
          </div>
        </div>
        {this.state.isActive && <Menu closeMenu={this.closeMenu} />}
      </div>
    )
  }
}
export default AccessRights(Topnav)
