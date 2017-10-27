import Message from './components/message/message.jsx'
import Topnav from './components/topnav/topnav.jsx'
import React, {Component} from 'react'
import './send-sms.styl'

class sendSMS extends Component {
  render () {
    return (
      <div id='send-sms'>
        <Topnav />
        <Message />
        <div className='test' />
      </div>
    )
  }
}
export default sendSMS
