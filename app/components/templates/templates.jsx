import TemplatesList from '../templates-list/templates-list.jsx'
import Topnav from '../topnav/topnav.jsx'
import React, {Component} from 'react'
import './templates.styl'

class Templates extends Component {
  componentWillMount = () => { if (config.isRtL) document.getElementsByTagName('body')[0].style.direction = 'rtl' }
  update = () => this.forceUpdate()
  render () {
    return (
      <div id='templates'>
        <Topnav update={this.update} />
        <TemplatesList update={this.update} />
        <div className='test' />
      </div>
    )
  }
}
export default Templates
