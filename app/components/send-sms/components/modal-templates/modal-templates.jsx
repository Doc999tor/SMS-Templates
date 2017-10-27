import React, {Component, PropTypes} from 'react'
import Modal from 'react-bootstrap-modal'
import './modal-templates.styl'
import {Link} from 'react-router-dom'

class Templates extends Component {
  cancel = () => this.props.handleModalTemplates()
  render () {
    return (
      <Modal show={this.props.isVisibleModalTemplates} dialogClassName='main-modal-dialog' onHide={this.cancel}>
        <Modal.Header>
          <h1 className={config.isRtL ? 'pd-r' : 'pd-l'} >{config.translations.templates_list}</h1>
          <img className={config.isRtL ? 'left' : 'right'} src={config.urls.media + 'add.svg'} onClick={this.cancel} />
        </Modal.Header>
        <div id='templates-body'>
          {config.templates.filter(i => i.type === 'common').map(i => {
            let a = i.text.match(/\$\$(?:\w+)\$\$/gm)
            let t = i.text.replace(/\$\$(?:\w+)\$\$/gm, i => `<span class='tag'>${config.translations.tags[i.slice(2, -2)]}</span>`)
            return (
              <div className='data' key={i.id}>
                <div className='name'>{i.name}</div>
                <div className='text' dangerouslySetInnerHTML={{ __html: t }} />
                <div className='tags'>{a && a.length > 0 && a.map((i, k) => config.translations.tags[i.slice(2, -2)] + (a.length > k + 1 && ', '))}</div>
              </div>)
          })}
          <div className='to-templates'>
            <Link to={config.urls.templates}>{config.translations.to_templates_list}</Link>
          </div>
        </div>
      </Modal>
    )
  }
}
Templates.propTypes = {
  isVisibleModalTemplates: PropTypes.bool.isRequired,
  handleModalTemplates: PropTypes.func.isRequired
}

export default Templates
