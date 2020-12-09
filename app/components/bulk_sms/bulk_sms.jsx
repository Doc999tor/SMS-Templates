import React, { useState, useEffect } from 'react'

import BulkSmsForm from './components/bulk_sms_form/bulk_sms_form'

import './bulk_sms.styl'

const BulkSms = () => {
  const [clients, setCliens] = useState([])
  const [referrer, setReferrer] = useState('')
  useEffect(() => {
    const searchParams = new URLSearchParams(location?.search)
    const clientsFromUrl = JSON.parse(searchParams.get('clients'))
    clientsFromUrl && setCliens(clientsFromUrl)
    setReferrer(searchParams.get('referrer'))
  }, [])
  const goBack = () => window.history.back()
  return (
    <div className='bulk_sms'>
      <header>
        <p className='recipients'>{config.translations.bulk_sms.recipients_label}</p>
        <label className='amt_clients'>{config.translations.bulk_sms.amt_clients.replace('{amt}', clients?.length)}<button className='add_clients_btn' type='button' onClick={goBack}><img src={`${config.urls.media}ic_clients.svg`} alt='' /></button></label>
      </header>
      <BulkSmsForm clients={clients} referrer={referrer} />
    </div>
  )
}

export default BulkSms
