import React, { useState } from 'react'
import { NAV_ITEMS } from '../../constants'
import Logo from '../../assets/images/kohler_logo.svg'
import HamburgerIcon from '../../assets/images/hamburger.svg'

const Navbar = () => {
  const [isHamburger, setIsHamburger] = useState(false)

  const handleHamburger = e => {
    setIsHamburger(!isHamburger)
  }

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='nav-group'>
          <div className='hamburger'>
            <img src={HamburgerIcon} onClick={handleHamburger} />
            <span>Menu</span>
          </div>
          <div className='logo'>
            <img src={Logo} />
          </div>
          <ul className={`menu ${isHamburger ? 'open' : ''}`}>
            <li className='mobilesearch'>
              <input
                type='text'
                placeholder='Search'
                className='search-input'
              />
              <i className='bi bi-search input-search'></i>
            </li>
            {NAV_ITEMS.navList.map(item => {
              return (
                <li key={item.title}>
                  <a>{item.title}</a>
                  <ul className='submenu'>
                    {item.items.map(val => (
                      <li key={val.menu}>
                        <a href={`/${'region'}${val.link}`}>{val.menu}</a>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ul>
          <div className='search-box'>
            <input type='text' placeholder='Search' className='search-input' />
            <i className='bi bi-search input-search'></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
