import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
// import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
// import Templates from './components/templates/templates.jsx'
// import SendSMS from './components/send-sms/send-sms.jsx'
import './main.styl'

window.setCursorAfterTag = tag => {
  const template = tag.parentNode
  const range = document.createRange()
  const node = tag.nextSibling
  if (node?.length) {
    range.setStart(node, 0)
    range.setEnd(node, node.length)
    const sel = window.getSelection()
    sel.removeAllRanges()
    range.collapse(true)
    sel.addRange(range)
  } else {
    range.selectNodeContents(template)
    range.collapse(false)
    const sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
  }
  template?.focus()
}

document.getElementsByTagName('body')[0].style.direction = config.isRTL ? 'rtl' : 'ltr'
ReactDOM.render(
  <App />,
  // <BrowserRouter>
  //   <Switch>
  //     <Route exact path={config.urls.templates} component={Templates} />
  //     <Route path={config.urls.send_sms} component={SendSMS} />
  //     <Redirect from='/' to={config.urls.templates} />
  //   </Switch>
  // </BrowserRouter>,
  document.getElementById('root'))
