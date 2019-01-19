import TemplatesList from './components/templates-list/templates-list.jsx'
import Topnav from './components/topnav/topnav.jsx'
import './templates.styl'

export default class Templates extends React.Component {
  componentWillMount = () => { if (config.isRTL) document.getElementsByTagName('body')[0].style.direction = 'rtl' }
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
