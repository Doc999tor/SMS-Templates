import Templates from './components/templates/templates.jsx'
import SendSMS from './components/send-sms/send-sms.jsx'
import './main.styl'
const {BrowserRouter, Redirect, Switch, Route} = ReactRouterDOM

window.removeTag = p => {
  p.parentNode.removeChild(p)
  document.getElementById('main_text_input').blur()
  document.getElementById('main_text_input').focus()
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path={config.urls.templates} component={Templates} />
      <Route path={config.urls.send_sms} component={SendSMS} />
      <Redirect from='/' to={config.urls.templates} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'))
