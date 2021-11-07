import React, { useState } from 'react'
import Location from '../../assets/images/location.svg'

const Rightmenu = () => {
  const [isLangMenu, setIsLangMenu] = useState()
  return (
    <div className='rightmenu'>
      <ul className='menu'>
        <li>
          <a href='#'>Get a Quote</a>
        </li>
        <li>
          <a href='#'>
            <img src={Location} /> Distributor Locator
          </a>
        </li>
        <li>
          <a onClick={() => setIsLangMenu(!isLangMenu)}>North America - EN</a>
        </li>
      </ul>
      {isLangMenu ? (
        <div className='countrylang'>
          <div className='header'>
            <div className='title'>Region</div>
            <div className='title'>Language</div>
          </div>
          <div className='body'>
            <div className='items'>
              <ul>
                <li>North America</li>
                <li>Central America</li>
                <li>South America</li>
                <li>Caribbean</li>
                <li>Europe</li>
                <li>Middle East</li>
              </ul>
            </div>
            <div className='items'>
              <ul>
                <li>English</li>
                <li>French</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Rightmenu
