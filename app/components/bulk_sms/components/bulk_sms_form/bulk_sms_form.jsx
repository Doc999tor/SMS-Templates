import React, { useState, useRef, useEffect } from 'react'

import PreviewSMSPopup from '../preview_sms_popup/preview_sms_popup'
import { getCurrentFormatTime } from 'helpers/currentTime.js'
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

const BulkSmsForm = ({ clients }) => {
  const inputEl = useRef(null)
  const [template, setTemplate] = useState('')
  const [previewText, setPreviewText] = useState('')
  const [preview, setPreview] = useState(false)
  const [activePopup, setActivePopup] = useState(false)
  const [sendingPopup, setSendingPopup] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const [noSms, setNoSms] = useState(false)
  const [length, setLength] = useState(0)
  const [unloadTrigger, setUnloadTrigger] = useState(false)
  const [smsPermission, setSmsPermission] = useState(false)

  useEffect(() => {
    setLength(checkLength(inputEl.current?.textContent))
  }, [previewText, template])

  const onUnload = e => {
    if (+length > 0 && !unloadTrigger) {
      e.preventDefault()
      e.returnValue = ''
    }
  }

  useEffect(() => {
    if (+length > 0 && !unloadTrigger) window.addEventListener('beforeunload', onUnload)
    return () => window.removeEventListener('beforeunload', onUnload)
  }, [length, unloadTrigger])

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
      setSmsPermission(false)
      setActivePopup(false)
    }, 300)
  }

  const handleAddTag = tag => {
    const tagInText = `<span class='tag' contentEditable='false' onclick='setCursorAfterTag(this)'>${config.translations.tags[tag].label}</span>`
    setTemplate(text => text + tagInText)
    setPreviewText(replaceTags(inputEl.current?.textContent, false))
    setTimeout(() => setCursor(), 10)
  }

  const handleBlurTemplate = ({ currentTarget: { innerHTML, textContent } }) => {
    setTemplate(innerHTML)

    setPreviewText(`${replaceTags(textContent, false)} ${config.translations.unsubscribe_link.preview_text}`)
  }

  const handleChangeInput = ({ currentTarget: { textContent } }) => {
    setLength(checkLength(inputEl.current?.textContent))
    setPreviewText(replaceTags(textContent, false))
    const nasty_br = document.getElementsByTagName('br')
    if (nasty_br.length) {
      for (let i = (nasty_br.length - 1); i >= 0; i--) {
        nasty_br[i].parentNode.removeChild(nasty_br[i])
      }
    }
  }

  const setCursor = () => {
    const range = document.createRange()
    range.selectNodeContents(inputEl.current)
    range.collapse(false)
    const sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
    inputEl.current.focus()
  }

  const handleSendSMS = e => {
    e.preventDefault()
    if (+length > 0) {
      const allowSending = config.sms_credits > Math.ceil((length + config.translations.unsubscribe_link.average_length)/config.sms_page_size)*clients?.length
      setUnloadTrigger(true)
      if (allowSending) {
        setShowPopup(true)
        const body = {
          clients,
          text: `${replaceTags(inputEl.current?.textContent, true)} ${config.tag_list.unsubscribe_link}`,
          added: getCurrentFormatTime()
        }
        const url = `${config.urls.send_sms}`
        postService(url, JSON.stringify(body)).then(({ status }) => {
          if (status === 201) {
            setSendingPopup(false)
            setTimeout(() => {
              window.history.back()
            }, 2000)
          }
          if (status === 409) {
            setShowPopup(false)
            setNoSms(true)
          }
          if (status === 451) {
            setShowPopup(false)
            setSmsPermission(true)
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

  const handleClickCancel = () => window.history.back()

  return (
    <>
      <form className='bulk-sms-form' onSubmit={handleSendSMS}>
        <span
          className='template'
          name='template'
          ref={inputEl}
          contentEditable
          onBlur={handleBlurTemplate}
          onInput={handleChangeInput}
          placeholder={input_placeholder}
          dangerouslySetInnerHTML={{ __html: template }}
        />
        <p className='characters'>{
          length && +length > config.sms_page_size
            ? config.translations.bulk_sms.bulk_sms_form?.exceed_characters_number
              .replace('{currentTemplateSymbols}', length)
              .replace('{maxTemplateSymbols}', config.sms_page_size)
              .replace('{pages_count}', Math.ceil(length / config.sms_page_size))
            : config.translations.bulk_sms.bulk_sms_form?.characters_number
              .replace('{currentTemplateSymbols}', length)
              .replace('{maxTemplateSymbols}', config.sms_page_size)
        }</p>
        <button className={'preview_btn' + (+length < 1 ? ' inactive_btn' : '')} type='button' onClick={handleShowPopup}><img src={`${config.urls.media}ic_preview.svg`} alt='' />{preview_btn_label}</button>
        <div className='tags_strip'>
          <p className='tags_strip_title'>{tags_strip_title}</p>
          <div className='tags_list'>
            {Object.keys(config.tag_list).map(tag => {
              return (config.translations.tags[tag]?.label && <span className={'tag' + (inputEl.current?.textContent?.includes(config.translations.tags[tag].label) ? ' used_tag' : '')} key={config.translations.tags[tag].label} onClick={() => { !inputEl.current?.textContent?.includes(config.translations.tags[tag].label) && handleAddTag(tag)}}>{config.translations.tags[tag].label}</span>)
            })}
          </div>
        </div>
        <div className='btns_wrapper'>
          <div className='btns_sections'>
            <button className='cancel' onClick={handleClickCancel} type='button'><img src={`${config.urls.media}ic_cancel.svg`} alt='' />{cancel_btn_label}</button>
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
        smsPermission={smsPermission}
        isActivePopup={activePopup}
        onClosePopup={handleCloseNoSmsPopup}
        btn_label={config.translations.no_sms_popup.buy_btn_lable}
        text={config.translations.no_sms_popup.text_label}
        textPermission={config.translations.warning_sms_popup.text_label}
        permission_btn_label={config.translations.warning_sms_popup.btn_lable}
        onBuySms={handleBuySms}
      />}
    </>
  )
}

export default BulkSmsForm
