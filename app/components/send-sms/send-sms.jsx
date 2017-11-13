import Message from './components/message/message.jsx'
import Topnav from './components/topnav/topnav.jsx'
import './send-sms.styl'

const sendSMS = () => {
  return (
    <div id='send-sms'>
      <Topnav />
      <Message />
      <div className='test' />
    </div>
  )
}
export default sendSMS
