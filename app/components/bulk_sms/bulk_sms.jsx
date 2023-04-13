import React, { useState, useEffect } from 'react'

import BulkSmsForm from './components/bulk_sms_form/bulk_sms_form'

import './bulk_sms.styl'

const digits =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'

function splitChunks(input, size) {
  const arr = []
  for (let i = 0; i < input.length; i += size) {
    arr.push(input.slice(i, i + size))
  }
  return arr
}
const unPad = str => (str[0] === '$' ? str[1] : str)
const fromB64 = x => x.split('').reduce((s, v) => s * 64 + digits.indexOf(v), 0)

const BulkSms = () => {
  const [clients, setClients] = useState([])
  useEffect(() => {
    const searchParams = new URLSearchParams(location?.search)
    const clientsFromUrl = splitChunks(
      searchParams.get('clients').slice(1, -1),
      2
    )
      .map(unPad)
      .map(fromB64)
    console.log(clientsFromUrl)
    setClients(clientsFromUrl)
  }, [])
  const goBack = () => window.history.back()
  return (
    <div className='bulk_sms'>
      <header>
        <p className='recipients'>
          {config.translations.bulk_sms.recipients_label}
        </p>
        <label className='amt_clients'>
          {config.translations.bulk_sms.quantity_clients.replace(
            '{quantity}',
            clients?.length
          )}
          <button className='add_clients_btn' type='button' onClick={goBack}>
            <img src={`${config.urls.media}ic_clients.svg`} alt='' />
          </button>
        </label>
      </header>
      <BulkSmsForm clients={clients} />
      <p id='legal_warning'>
        {config.translations.legal_warning}
        <a href={config.urls.legal_link} target='_blank'>
          {config.translations.legal_link}
        </a>
      </p>
    </div>
  )
}

export default BulkSms
