import React, { useState, useEffect } from 'react'
import history from '@history/'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Location from '../../assets/images/location.svg'

const Rightmenu = () => {
  const { region } = useParams()
  const [isLangMenu, setIsLangMenu] = useState()
  const [currentRegion, setCurrentRegion] = useState({
    countryName: 'North America',
    countryLang: [{ name: 'English', code: 'na' }]
  })
  const [language, setLanguage] = useState({ name: 'English', code: 'na' })
  const { countryLang = [] } = currentRegion

  const regionSelector = [
    {
      countryName: 'North America',
      countryLang: [{ name: 'English', code: 'na' }]
    },
    {
      countryName: 'Central America',
      countryLang: [
        { name: 'English', code: 'latam' },
        { name: 'Spanish', code: 'latam' }
      ]
    },
    {
      countryName: 'South America',
      countryLang: [
        { name: 'English', code: 'latam' },
        { name: 'Spanish', code: 'latam' }
      ]
    },
    {
      countryName: 'Caribbean',
      countryLang: [
        { name: 'English', code: 'latam' },
        { name: 'Spanish', code: 'latam' }
      ]
    },
    {
      countryName: 'Europe',
      countryLang: [
        { name: 'English', code: 'emea' },
        { name: 'French', code: 'emea' }
      ]
    },
    {
      countryName: 'Middle East',
      countryLang: [{ name: 'English', code: 'emea' }]
    },
    {
      countryName: 'Saudi Arabia',
      countryLang: [{ name: 'English', code: 'emea' }]
    },
    {
      countryName: 'Africa',
      countryLang: [
        { name: 'English', code: 'emea' },
        { name: 'French', code: 'emea' }
      ]
    },
    { countryName: 'China', countryLang: [{ name: 'Chinese', code: 'cn' }] },
    { countryName: 'India', countryLang: [{ name: 'English', code: 'in' }] },
    {
      countryName: 'Asia-Pacific',
      countryLang: [{ name: 'English', code: 'sea' }]
    }
  ]

  const handleCountry = item => {
    const defaultLag = item.countryLang[0]
    console.log(defaultLag)
    history.push(`?lang=${defaultLag.code}`)
    setLanguage(defaultLag)
    setCurrentRegion(item)
  }

  const handleRegionMenu = () => {
    setIsLangMenu(!isLangMenu)
  }

  const handleSelectLang = lang => {
    setIsLangMenu(!isLangMenu)
    setLanguage(lang)
  }

  return (
    <div className='rightmenu'>
      <ul className='menu'>
        <li>
          <a href={`${region}/en/generators/industrial/get-a-quote`}>
            Get a Quote
          </a>
        </li>
        <li>
          <a href='#'>
            <img src={Location} /> Distributor Locator
          </a>
        </li>
        <li>
          <a onClick={handleRegionMenu}>
            {currentRegion.countryName} - {language.code}
          </a>
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
                {regionSelector.map((item, i) => (
                  <li
                    className={
                      item.countryName === currentRegion.countryName
                        ? 'active'
                        : ''
                    }
                    onClick={() => handleCountry(item)}
                    key={i}
                  >
                    {item.countryName}
                  </li>
                ))}
              </ul>
            </div>

            <div className='items'>
              <ul>
                {countryLang.map((item, i) => (
                  <li
                    className={item.name === language.name ? 'active' : ''}
                    onClick={() => handleSelectLang(item)}
                    key={i}
                  >
                    <Link to={`?lang=${item.code}`}>{item.name}</Link>
                  </li>
                ))}
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
