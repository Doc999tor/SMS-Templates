import Message from './components/message/message.jsx'
import Topnav from './components/topnav/topnav.jsx'
import './send-sms.styl'

export default class sendSMS extends React.Component {
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
