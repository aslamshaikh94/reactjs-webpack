import React, { useState } from 'react'
import { useParams } from 'react-router'
import { NAV_ITEMS } from '../../constants'
import Logo from '../../assets/images/kohler_logo.svg'
import HamburgerIcon from '../../assets/images/hamburger.svg'
import RegionLanguageMobile from './Regionlanguagemobile'

const MobileNavItems = ({ item }) => {
  const { region } = useParams()
  const [isMobilesubmenu, setIsMobilesubmenu] = useState(false)

  const handleMobilesubmenu = e => {
    setIsMobilesubmenu(!isMobilesubmenu)
  }

  return (
    <li key={item.title}>
      <a onClick={handleMobilesubmenu}>{item.title}</a>
      <ul className={`submenu ${isMobilesubmenu ? 'open' : ''}`}>
        {item.items.map(val => (
          <li key={val.menu}>
            <a href={`/${region}${val.link}`}>{val.menu}</a>
          </li>
        ))}
      </ul>
    </li>
  )
}

const Navbar = () => {
  const { region } = useParams()
  const [isHamburger, setIsHamburger] = useState(false)

  const [handleModalmobile, setHandleModalmobile] = useState(false)

  const handleHamburger = e => {
    setIsHamburger(!isHamburger)
  }

  return (
    <div className='global-navbar'>
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
            {NAV_ITEMS.navList.map((item, i) => {
              return <MobileNavItems item={item} key={i} />
            })}
            <p className='quote-mobile-link mb-0'>
              <a href={`/${region}/en/generators/industrial/get-a-quote`}>
                Get a Quote
              </a>
            </p>
            <p className='regionlanguage-mobile-link mb-0'>
              <a onClick={() => setHandleModalmobile(true)}>
                Region & Language
              </a>
              <RegionLanguageMobile
                setHandleModalmobile={setHandleModalmobile}
                handleModalmobile={handleModalmobile}
              />
            </p>
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
