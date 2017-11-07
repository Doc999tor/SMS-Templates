import './topnav.styl'

export default class Topnav extends React.Component {
  render () {
    return (
      <div id='topnav'>
        <div className='header'>
          <div className={'icons-l ' + (config.isRtL ? 'right' : 'left')}>
            <div className={'icon ' + (config.isRtL ? 'right' : 'left')} onClick={() => window.history.go(-1)}>
              <img className={'arrow-back ' + (config.isRtL && 'arrow-back-mr')} src={config.urls.media + 'arrow-back.svg'} />
            </div>
          </div>
          <div className='reminders'><h1>{config.translations.new_message}</h1></div>
          <div className={'icons-r ' + (config.isRtL ? 'left' : 'right')} />
        </div>
      </div>
    )
  }
}
