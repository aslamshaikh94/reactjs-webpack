import React, { useRef, useState } from 'react'
import LogoUrl from '../../assets/images/logo.png'
import { COUNTRY_NAV } from '../../constants'

const Countrymenue = props => {
  const { isMenu } = props
  if (!isMenu) return ''
  else
    return (
      <div className='countrymenue'>
        <div className='container'>
          <div className='wrapper'>
            <img src={LogoUrl} className='logo' />
            <div className='navwrapper'>
              {COUNTRY_NAV.map(item => {
                return <Navgroup key={item.title} data={item} />
              })}
            </div>
          </div>
        </div>
      </div>
    )
}

function Navgroup(props) {
  const { data } = props
  const [isMenu, setIsMenu] = useState(false)

  return (
    <div className='navgroup' onClick={() => setIsMenu(!isMenu)}>
      <h3>
        {data.title}{' '}
        <i className={`bi bi-caret-${isMenu ? 'up' : 'down'}-fill careticon`} />
      </h3>
      <ul className={isMenu ? 'open' : ''}>
        {data.menus.map(menu => {
          return (
            <li key={menu.name}>
              <a href={menu.link}> {menu.name}</a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Countrymenue
