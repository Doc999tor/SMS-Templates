import React, {useState} from 'react'

import './bulk_sms_form.styl'
const {
  input_placeholder,
  characters_label,
  preview_btn_label,
  tags_strip_title,
  send_btn_label,
  cancel_btn_label
} = config.translations.bulk_sms.bulk_sms_form
const BulkSmsForm = () => {
  const [template, setTemplate] = useState('')
  return (
    <form className='bulk-sms-form'>
      <textarea className='template' name='template' rows='6' placeholder={input_placeholder} />
      <p className='characters'>{characters_label} <span>{template.length}</span>/<span>{config.sms_bank}</span></p>
      <button className={'preview_btn' + (template?.trim().length < 1 ? ' inactive_btn' : '')} type='button'><img src={`${config.urls.media}ic_preview.svg`} alt='' />{preview_btn_label}</button>
      <div className='tags_strip'>
        <p className='tags_strip_title'>{tags_strip_title}</p>

      </div>
      <div className='btns_wrapper'>
        <div className='btns_sections'>
          <button className='cancel'><img src={`${config.urls.media}ic_cancel.svg`} alt='' />{cancel_btn_label}</button>
          <button className='send'><img src={`${config.urls.media}ic_send.svg`} alt='' />{send_btn_label}</button>
        </div>
      </div>
    </form>
  )
}

export default BulkSmsForm
