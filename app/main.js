import Templates from './components/templates/templates.jsx'
import SendSMS from './components/send-sms/send-sms.jsx'
import './main.styl'

window.removeTag = p => {
  p.parentNode.removeChild(p)
  document.getElementById('main_text_input').click()
}

ReactDOM.render(
  <ReactRouterDOM.BrowserRouter>
    <ReactRouterDOM.Switch>
      <ReactRouterDOM.Route exact path={config.urls.templates} component={Templates} />
      <ReactRouterDOM.Route path={config.urls.send_sms} component={SendSMS} />
      <ReactRouterDOM.Redirect from='/' to={config.urls.templates} />
    </ReactRouterDOM.Switch>
  </ReactRouterDOM.BrowserRouter>,
document.getElementById('root'))
