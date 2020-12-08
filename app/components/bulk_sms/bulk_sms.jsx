import React from 'react'

import BulkSmsForm from './components/bulk_sms_form/bulk_sms_form'

import './bulk_sms.styl'

const BulkSms = () => {
  const clients = [1, 13, 7]
  const referrer = '/client/1234'
  return (
    <div className='bulk_sms'>
      <header>
        <p className='recipients'>{config.translations.bulk_sms.recipients_label}</p>
        <label className='amt_clients'>{config.translations.bulk_sms.amt_clients.replace('{amt}', clients?.length)}<button className='add_clients_btn' type='button' onClick={() => console.log('object')}><img src={`${config.urls.media}ic_clients.svg`} alt='' /></button></label>
      </header>
      <BulkSmsForm clients={clients} referrer={referrer} />
    </div>
  )
}

export default BulkSms
