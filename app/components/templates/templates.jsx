import React, {Component} from 'react'
import TemplatesList from './components/templates-list/templates-list.jsx'
import Header from './components/header/header.jsx'
import './templates.styl'

export default class Templates extends Component {
  update = () => this.forceUpdate()
  render () {
    return (
      <div id='templates'>
        <Header update={this.update} />
        <TemplatesList update={this.update} />
      </div>
    )
  }
}
