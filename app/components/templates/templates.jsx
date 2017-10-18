import React, {Component} from 'react'
import Swiper from 'react-id-swiper'
import './templates.styl'
class Templates extends Component {
  constructor () {
    super()
    this.state = {
    }
  }
  render () {
    return (
      <div id='templates'>
        {config.templates.map(i => (
          <Swiper slidesPerView='auto' initialSlide={0} key={i.id} >
            <div className='reminder'>
              <div className='data'>
                <div className='name'>{i.name}</div>
                <div className='text' dangerouslySetInnerHTML={{ __html: i.text.replace(/\$\$(?:\w+)\$\$/gm, str => `<span class='tag'>${config.translations.tags[str.slice(2, -2)]}</span>`) }} />
                <div className='tags'>{i.text.match(/\$\$(?:\w+)\$\$/gm).map(str => config.translations.tags[str.slice(2, -2)] + ', ')}</div>
              </div>
              <div className='send'>
                <img src={config.urls.media + 'send.png'} />
              </div>
            </div>
            <div className='controls'>
              <div className='icon delete'>
                <img src={config.urls.media + 'pencil.svg'} />
              </div>
              <div className='icon edit'>
                <img src={config.urls.media + 'trash.svg'} />
              </div>
              <div className='icon clone'>
                <img src={config.urls.media + 'clone.svg'} />
              </div>
            </div>
          </Swiper>
        ))}
      </div>
    )
  }
}
export default Templates
