import {Modal} from 'project-components'
import './modal-templates.styl'

export default class Templates extends React.Component {
  cancel = () => this.props.handleModalTemplates()
  render () {
    return (
      <Modal show={this.props.isVisibleModalTemplates} dialogClassName='main-modal-dialog' onHide={this.cancel}>
        <div className='templates-header'>
          <h1 className={config.isRtL ? 'pd-r' : 'pd-l'} >{config.translations.templates_list}</h1>
          <img className={config.isRtL ? 'left' : 'right'} src={config.urls.media + 'add.svg'} onClick={this.cancel} />
        </div>
        <div className='templates-body'>
          {config.templates.filter(i => i.type === 'common').map(i => {
            let a = i.text.match(/\$\$(?:\w+)\$\$/gm)
            let t = i.text.replace(/\$\$(?:\w+)\$\$/gm, i => `<span class='tag'>${config.translations.tags[i.slice(2, -2)]}</span>`)
            return (
              <div className='data' key={i.id} onClick={() => { this.props.getTemplate(i.text); this.cancel() }}>
                <div className='name'>{i.name}</div>
                <div className='text' dangerouslySetInnerHTML={{ __html: t }} />
                <div className='tags'>{a && a.length > 0 && a.map((i, k) =>
                  config.translations.tags[i.slice(2, -2)] + (a.length > k + 1 && ', '))}</div>
              </div>)
          })}
        </div>
        <div className='to-templates'><ReactRouterDOM.Link to={config.urls.templates}>{config.translations.to_templates_list}</ReactRouterDOM.Link></div>
      </Modal>
    )
  }
}
Templates.propTypes = {
  isVisibleModalTemplates: PropTypes.bool.isRequired,
  handleModalTemplates: PropTypes.func.isRequired,
  getTemplate: PropTypes.func.isRequired
}
