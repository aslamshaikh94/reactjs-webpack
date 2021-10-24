import React, { useState } from 'react'
import { NAV_ITEMS } from '../../constants'
import Logo from '../../assets/images/logo.svg'
import Location from '../../assets/images/location.svg'
import './index.scss'

function Header() {
  const [show, setShow] = useState(false)
  const showDropdown = e => {
    setShow(!show)
  }
  const hideDropdown = e => {
    setShow(false)
  }

  return (
    <header>
      <div className='topmenu'>
        <div className='container'>
          <div className='menugroup'>
            <div className='leftmenu'>
              <img
                src='https://nav.kohlerpower.com/assets/images/globe-icon-retina@2x.png'
                className='icon'
              />
              <span>KOHLER Power Worldwide </span>
            </div>
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
                  <a href='#'>North America - EN</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='navbar'>
        <div className='container'>
          <div className='nav-group'>
            <div className='logo'>
              <img src={Logo} />
            </div>
            <ul className='menu'>
              {NAV_ITEMS.map(item => {
                return (
                  <li key={item.title}>
                    {item.title}
                    <ul className='submenu'>
                      {item.items.map(menu => (
                        <li key={menu}>
                          <a href='#'>{menu}</a>
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              })}
            </ul>
            <div className='search-box'>
              <input
                type='text'
                placeholder='Search'
                className='search-input'
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
