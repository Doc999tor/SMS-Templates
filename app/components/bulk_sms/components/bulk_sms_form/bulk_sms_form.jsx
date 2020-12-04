import React, {useState} from 'react'

import PreviewSMSPopup from '../preview_sms_popup/preview_sms_popup'
import checkLength from 'project-components/checkLength.js'

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
  const [preview, setPreview] = useState(false)
  const [activePopup, setActivePopup] = useState(false)
  const handleShowPopup = () => setPreview(true)
  const handleClosePopup = () => {
    setActivePopup(true)
    setTimeout(() => {
      setPreview(false)
      setActivePopup(false)
    }, 300)
  }
  const handleAddTag = tag => {
    const tagInText = ` &thinsp;<span class='tag' contentEditable='false'>${config.translations.tags[tag].label}</span>&thinsp; `
    setTemplate(text => text + tagInText)
  }
  const handleBlurTemplate = ({ currentTarget: { innerHTML} }) => {
    setTemplate(innerHTML)
  }
  return (
    <>
      <form className='bulk-sms-form'>
        <p
          className='template'
          name='template'
          contentEditable
          onBlur={handleBlurTemplate}
          placeholder={input_placeholder}
          dangerouslySetInnerHTML={{ __html: template }}
        >
        </p>
        <p className='characters'>{characters_label} <span>{template.length}</span>/<span>{config.sms_bank}</span></p>
        <button className={'preview_btn' + (template?.trim().length < 1 ? ' inactive_btn' : '')} type='button' onClick={handleShowPopup}><img src={`${config.urls.media}ic_preview.svg`} alt='' />{preview_btn_label}</button>
        <div className='tags_strip'>
          <p className='tags_strip_title'>{tags_strip_title}</p>
          <div className='tags_list'>
            {Object.keys(config.translations.tags).map(tag => {
              return <span className='tag' key={config.translations.tags[tag].label} onClick={() => handleAddTag(tag)}>{config.translations.tags[tag].label}</span>
            })}
          </div>
        </div>
        <div className='btns_wrapper'>
          <div className='btns_sections'>
            <button className='cancel'><img src={`${config.urls.media}ic_cancel.svg`} alt='' />{cancel_btn_label}</button>
            <button className='send'><img src={`${config.urls.media}ic_send.svg`} alt='' />{send_btn_label}</button>
          </div>
        </div>
      </form>
      {preview && <PreviewSMSPopup text={template} isActivePopup={activePopup} closePopup={handleClosePopup} />}
    </>

  )
}

export default BulkSmsForm
