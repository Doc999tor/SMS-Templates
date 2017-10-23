import React, {Component} from 'react'
import Swiper from 'react-id-swiper'
import './templates.styl'

class Templates extends Component {
  render () {
    return (
      <div id='templates'>
        {config.templates.map((i, k) => {
          let a = i.text.match(/\$\$(?:\w+)\$\$/gm)
          let t = i.text.replace(/\$\$(?:\w+)\$\$/gm, i => `<span class='tag'>${config.translations.tags[i.slice(2, -2)]}</span>`)
          return (
            <Swiper slidesPerView='auto' initialSlide={0} key={k}>
              <div className='reminder'>
                <div className='data'>
                  <div className='name'>{i.name}</div>
                  <div className='text' dangerouslySetInnerHTML={{ __html: t }} />
                  <div className='tags'>{a && a.length > 0 && a.map((i, k) => config.translations.tags[i.slice(2, -2)] + (a.length > k + 1 && ', '))}</div>
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
              </div>
            </Swiper>)
        })}
      </div>
    )
  }
}
export default Templates
