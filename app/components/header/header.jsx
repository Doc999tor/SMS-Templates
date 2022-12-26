import './header.styl'

const Header = () => {
  const goToBack = () => window.history.go(-1)
  return (
    <header id='header'>
        <button className='go-back' onClick={goToBack}>
          <img src={config.urls.media + 'ic_arrow_back.svg'} />
        </button>
      <p className='page_title'>{config.translations.bulk_sms.main_title}</p>
    </header>
  )
}
export default Header
