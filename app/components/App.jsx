import React from 'react'
import Header from '../components/header/header'
import BulkSms from '../components/bulk_sms/bulk_sms'

import './App.styl'

const App = () => {
  return (
    <div className='app'>
      <Header />
      <BulkSms />
    </div>
  )
}

export default App
