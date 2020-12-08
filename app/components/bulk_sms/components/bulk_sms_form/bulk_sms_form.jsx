import React, { useState, useRef, useEffect } from 'react'

import PreviewSMSPopup from '../preview_sms_popup/preview_sms_popup'
import SendingPopup from 'project-components/sending-popup/sending-popup'
import replaceTags from 'helpers/replaceTags.js'
import checkLength from 'helpers/checkLength.js'

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
  const inputEl = useRef(null);
  const [template, setTemplate] = useState('')
  const [previewText, setPreviewText] = useState('')
  const [preview, setPreview] = useState(false)
  const [activePopup, setActivePopup] = useState(false)
  const [sendingPopup, setSendingPopup] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const [length, setLength] = useState(0)
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
  const handleAddTag = tag => {
    const tagInText = ` <span class='tag' contentEditable='false'>${config.translations.tags[tag].label}</span>  `
    setTemplate(text => text + tagInText)
    setPreviewText(replaceTags(inputEl.current?.innerText, false))
    setTimeout(() => setCursor(), 10);
  }
  const handleBlurTemplate = ({ currentTarget: { innerHTML, innerText } }) => {
    setTemplate(innerHTML)
    setPreviewText(replaceTags(innerText, false))
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
  useEffect(() => {
    setLength(checkLength(inputEl.current?.innerText))
  }, [previewText, template])
  const handleSendSMS = e => {
    e.preventDefault()
    if (+length > 0) {
      setShowPopup(true)
      console.log('Sending...')
    }
  }
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
      {preview && <PreviewSMSPopup text={previewText} isActivePopup={activePopup} closePopup={handleClosePopup} />}
      {showPopup && <SendingPopup sendingPopup={sendingPopup} sending_label={config.translations.sending_popup.sending} success_label={config.translations.sending_popup.success} />}
    </>
  )
}

export default BulkSmsForm
