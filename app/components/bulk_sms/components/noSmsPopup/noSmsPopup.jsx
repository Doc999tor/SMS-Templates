import './noSmsPopup.styl'

const NoSmsPopup = ({
  isActivePopup,
  onClosePopup,
  text,
  btn_label,
  onBuySms,
}) => {
  const preventClick = e => e.stopPropagation()
  return (
    <div className={'nosms_wrap' + (isActivePopup ? ' nosms-background' : '')} onClick={onClosePopup}>
      <div className={'nosms_body' + (isActivePopup ? ' hide-nosms' : '')} onClick={preventClick}>
        <button type='button' className='close_popup_btn' onClick={onClosePopup}>
          <img src={`${config.urls.media}ic_close_blue.svg`} />
        </button>
        <div className='common_circle'>
          <img src={`${config.urls.media}ic_sms.svg`} />
        </div>
        <p className='text_conflict'>
          {text}
        </p>
        <button className='buy_sms_button' type='button' onClick={onBuySms}>
          <img src={`${config.urls.media}ic_buy.svg`} />
          {btn_label}
        </button>
      </div>
    </div>
  )
}

export default NoSmsPopup