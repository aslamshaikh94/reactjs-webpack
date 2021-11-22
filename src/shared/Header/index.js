import React, { useState } from 'react'
import { useParams } from 'react-router'
import Countrymenue from './Countrymenue'
import Rightmenu from './Rightmenu'
import Navbar from './Navbar'
import './index.scss'

function Header() {
  const [isCountryMenu, setIsCountryMenu] = useState(false)

  // switch ('country') {
  //   case 'na':
  //     setCountry('North America')
  //     break
  //   case 'emea':
  //     setCountry('EMEA')
  //     break
  //   case 'sea':
  //     setCountry('South East Asia')
  //     break
  //   case 'latam':
  //     setCountry('Latin America')
  //     break
  //   case 'india':
  //     setCountry('India')
  //     break
  // }

  return (
    <>
      <header>
        <div className='topmenu'>
          <div className='container'>
            <div className='menugroup'>
              <div className='leftmenu'>
                <img
                  src='https://nav.kohlerpower.com/assets/images/globe-icon-retina@2x.png'
                  className='icon'
                />
                <span
                  className='leftmenutitle'
                  onClick={() => setIsCountryMenu(!isCountryMenu)}
                >
                  KOHLER Power Worldwide{' '}
                  <i
                    className={`bi bi-caret-${
                      isCountryMenu ? 'up' : 'down'
                    }-fill`}
                  />
                </span>
              </div>
              <Rightmenu />
            </div>
          </div>
        </div>
        <Countrymenue isMenu={isCountryMenu} />
      </header>
      <Navbar />
    </>
  )
}

export default Header
