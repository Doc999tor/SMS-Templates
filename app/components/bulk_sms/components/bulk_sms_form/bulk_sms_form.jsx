import React, { useState, useRef, useEffect } from 'react'

import PreviewSMSPopup from '../preview_sms_popup/preview_sms_popup'
import SendingPopup from 'project-components/sending-popup/sending-popup'
import replaceTags from 'helpers/replaceTags.js'
import checkLength from 'helpers/checkLength.js'
import NoSmsPopup from '../noSmsPopup/noSmsPopup'

import { postService } from 'project-services/template.service.js'

import './bulk_sms_form.styl'

const {
  input_placeholder,
  characters_label,
  preview_btn_label,
  tags_strip_title,
  send_btn_label,
  cancel_btn_label
} = config.translations.bulk_sms.bulk_sms_form

const BulkSmsForm = ({ clients, referrer }) => {
  const inputEl = useRef(null);
  const [template, setTemplate] = useState('')
  const [previewText, setPreviewText] = useState('')
  const [preview, setPreview] = useState(false)
  const [activePopup, setActivePopup] = useState(false)
  const [sendingPopup, setSendingPopup] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const [noSms, setNoSms] = useState(false)
  const [length, setLength] = useState(0)

  useEffect(() => {
    setLength(checkLength(inputEl.current?.innerText))
  }, [previewText, template])

  const handleShowPopup = () => {
    if (+length > 0) {
      setPreview(true)
    }
  }

  const handleClosePopup = () => {
    setActivePopup(true)
    setTimeout(() => {
      setPreview(false)
      setActivePopup(false)
    }, 300)
  }

  const handleCloseNoSmsPopup = () => {
    setActivePopup(true)
    setTimeout(() => {
      setNoSms(false)
      setActivePopup(false)
    }, 300)
  }

  const handleAddTag = tag => {
    const tagInText = ` <span class='tag' contentEditable='false'>${config.translations.tags[tag].label}</span>  `
    setTemplate(text => text + tagInText)
    setPreviewText(replaceTags(inputEl.current?.innerText, false))
    setTimeout(() => setCursor(), 10);
  }

  const handleBlurTemplate = ({ currentTarget: { innerHTML, innerText } }) => {
    setTemplate(innerHTML)
    setPreviewText(`${replaceTags(innerText, false)} ${config.translations.unsubscribe_link.preview_text}`)
  }

  const handleChangeInput = ({ currentTarget: { innerText } }) => {
    setLength(checkLength(inputEl.current?.innerText))
    setPreviewText(replaceTags(innerText, false))
  }

  const setCursor = () => {
    const range = document.createRange();
    range.selectNodeContents(inputEl.current);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  const handleSendSMS = e => {
    e.preventDefault()
    if (+length > 0) {
      const allowSending = config.sms_credits > Math.ceil(length/config.sms_page_size)*clients?.length
      if (allowSending) {
        setShowPopup(true)
        const body = {
          clients,
          text: `${replaceTags(inputEl.current?.innerText, true)} ${config.translations.unsubscribe_link.preview_text}`
        }
        const url = `${config.urls.send_sms}${location?.search}`
        postService(url, body).then(({ status }) => {
          if (status === 201) {
            setSendingPopup(false)
            setTimeout(() => {
              window.location = referrer
            }, 500)
          }
          if (status === 409) {
            handleClosePopup()
            setNoSms(true)
          }
        })
      }
      if (!allowSending) {
        setNoSms(true)
      }
    }
  }

  const handleBuySms = () => window.location.href = config.urls.sms_settings_link

  return (
    <>
      <form className='bulk-sms-form' onSubmit={handleSendSMS}>
        <p
          className='template'
          name='template'
          ref={inputEl}
          contentEditable
          onBlur={handleBlurTemplate}
          onInput={handleChangeInput}
          placeholder={input_placeholder}
          dangerouslySetInnerHTML={{ __html: template }}
        >
        </p>
        <p className={'characters' + (length > config.sms_page_size ? ' warning_length' : '')}>{characters_label} <span>{length || 0}</span>/<span>{config.sms_page_size}</span></p>
        <button className={'preview_btn' + (+length < 1 ? ' inactive_btn' : '')} type='button' onClick={handleShowPopup}><img src={`${config.urls.media}ic_preview.svg`} alt='' />{preview_btn_label}</button>
        <div className='tags_strip'>
          <p className='tags_strip_title'>{tags_strip_title}</p>
          <div className='tags_list'>
            {Object.keys(config.translations.tags).map(tag => {
              return <span className={'tag' + (inputEl.current?.innerText?.includes(config.translations.tags[tag].label) ? ' used_tag' : '')} key={config.translations.tags[tag].label} onClick={() => { !inputEl.current?.innerText?.includes(config.translations.tags[tag].label) && handleAddTag(tag)}}>{config.translations.tags[tag].label}</span>
            })}
          </div>
        </div>
        <div className='btns_wrapper'>
          <div className='btns_sections'>
            <button className='cancel' type='button'><img src={`${config.urls.media}ic_cancel.svg`} alt='' />{cancel_btn_label}</button>
            <button className={'send' + ((+length < 1 ? ' inactive_btn' : ''))} type='submit'><img src={`${config.urls.media}ic_send.svg`} alt='' />{send_btn_label}</button>
          </div>
        </div>
      </form>
      {preview && <PreviewSMSPopup
        text={previewText}
        isActivePopup={activePopup}
        closePopup={handleClosePopup}
      />}
      {showPopup && <SendingPopup
        sendingPopup={sendingPopup}
        sending_label={config.translations.sending_popup.sending}
        success_label={config.translations.sending_popup.success}
      />}
      {noSms && <NoSmsPopup
        isActivePopup={activePopup}
        onClosePopup={handleCloseNoSmsPopup}
        btn_label={config.translations.no_sms_popup.buy_btn_lable}
        text={config.translations.no_sms_popup.text_label}
        onBuySms={handleBuySms}
      />}
    </>
  )
}

export default BulkSmsForm
