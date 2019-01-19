import './topnav.styl'

const Topnav = () => {
  return (
    <div id='topnav'>
      <div className='header'>
        <div className={'icons-l ' + (config.isRTL ? 'right' : 'left')}>
          <div className={'icon ' + (config.isRTL ? 'right' : 'left')} onClick={() => window.history.go(-1)}>
            <img className={'arrow-back ' + (config.isRTL && 'arrow-back-mr')} src={config.urls.media + 'arrow-back.svg'} />
          </div>
        </div>
        <div className='reminders'><h1>{config.translations.new_message}</h1></div>
        <div className={'icons-r ' + (config.isRTL ? 'left' : 'right')} />
      </div>
    </div>
  )
}
export default Topnav
