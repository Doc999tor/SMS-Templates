import Delete from '../modal-delete/modal-delete.jsx'
import Create from '../modal-create/modal-create.jsx'
import Swiper from 'project-components/Swiper/Swiper.js'
import './templates-list.styl'

export default class TemplatesList extends React.Component {
  static propTypes = {
    update: PropTypes.func.isRequired
  }
  state = {
    isVisibleCreateModalContex: false,
    isVisibleModalConfirmed: false,
    isVisibleCreateModal: false
  }
  findIndex = id => {
    let ind
    config.templates.find((i, k) => {
      if (i && i.id === id) {
        ind = k
        return true
      }
    })
    return ind
  }
  handleConfirmedModal = i => this.setState({isVisibleModalConfirmed: !this.state.isVisibleModalConfirmed, i: this.findIndex(i)}, this.props.update())
  handleCreateModal = i => {
    this.setState({isVisibleCreateModal: !this.state.isVisibleCreateModal, i: this.findIndex(i)})
    if (this.state.isVisibleCreateModalContex) setTimeout(() => this.setState({isVisibleCreateModalContex: false}), 300)
    else this.setState({isVisibleCreateModalContex: true})
    this.props.update()
  }
  render () {
    return (
      <div id='templates-list'>
        <Delete handleConfirmedModal={this.handleConfirmedModal} isVisibleModalConfirmed={this.state.isVisibleModalConfirmed} i={this.state.i} />
        {this.state.isVisibleCreateModalContex &&
          <Create handleCreateModal={this.handleCreateModal} isVisibleCreateModal={this.state.isVisibleCreateModal} isEdit i={this.state.i} />}
        {config.templates.map(i => {
          let a = i.text.match(/\$\$(?:\w+)\$\$/gm)
          let t = i.text.replace(/\$\$(?:\w+)\$\$/gm, i => `<span class='tag'>${config.translations.tags[i.slice(2, -2)]}</span>`)
          return (
            <Swiper slidesPerView='auto' initialSlide={0} key={i.id}>
              <div className='reminder'>
                <div className='data'>
                  <div className='name'>{i.name}</div>
                  <div className='text' dangerouslySetInnerHTML={{ __html: t }} />
                  <div className='tags'>{a && a.length > 0 && a.map((i, k) => config.translations.tags[i.slice(2, -2)] + (a.length > k + 1 ? ', ' : ''))}</div>
                </div>
              </div>
              <div className='controls'>
                <div className='icon delete'><img src={config.urls.media + 'pencil.svg'} onClick={() => { this.handleCreateModal(i.id) }} /></div>
                <div className='icon edit'><img src={config.urls.media + 'trash.svg'} onClick={() => { this.handleConfirmedModal(i.id) }} /></div>
              </div>
            </Swiper>)
        })}
      </div>
    )
  }
}
