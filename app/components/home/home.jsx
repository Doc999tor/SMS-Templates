import React, {Component} from 'react'
import './home.styl'

class Home extends Component {
  componentWillMount = () => { if (config.isRtL) document.getElementsByTagName('body')[0].style.direction = 'rtl' }
  update = () => this.forceUpdate()
  render () {
    return (
      <div id='home'>
        fasdasdfasd
        <div className='test' />
      </div>
    )
  }
}
export default Home
