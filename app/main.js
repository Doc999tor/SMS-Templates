import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Templates from './components/templates/templates.jsx'
import SendSMS from './components/send-sms/send-sms.jsx'
import ReactDOM from 'react-dom'
import React from 'react'
import './main.styl'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path={config.urls.templates} component={Templates} />
      <Route path={config.urls.send_sms} component={SendSMS} />
      <Redirect from='/' to={config.urls.templates} />
    </Switch>
  </BrowserRouter>,
document.getElementById('root'))
