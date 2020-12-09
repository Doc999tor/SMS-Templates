import React from 'react'

import './preview_sms_popup.styl'

const { title_label, button_label } = config.translations.bulk_sms.preview_popup
const PreviewSMSPopup = ({ text, closePopup, isActivePopup }) => {
  const preventClick = e => e.stopPropagation()
  return (
    <div className={'popup_wrap' + (isActivePopup ? ' hide-background' : '')} onClick={closePopup}>
      <div className={'popup_body' + (isActivePopup ? ' hide-body' : '')} onClick={preventClick}>
        <h2>{title_label}</h2>
        <div className='text-wrap'>
          <p className='preview-text'>{text}</p>
        </div>
        <button type='button' onClick={closePopup}><img src={`${config.urls.media}ic_okay.svg`} alt='' />{button_label}</button>
      </div>

    </div>
  )
}

export default PreviewSMSPopup
