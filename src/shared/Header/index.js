import React from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '@store'
import { userAuthSuccessAction } from '@actions'
import { isUserLoggedIn } from '@utils'
import history from '@history'
import { Container, Button, NavDropdown } from 'react-bootstrap'
import { callUserSignOutApi } from '@api'
import {
  AUTH_ROUTE,
  HOME_ROUTE,
  MY_PROFILE_ROUTE,
  DASHBOARD_ROUTE,
  PRODUCTS_ROUTE
} from '@constants/routes'
import addToaster from '@shared/Notification'
import DefaultPic from '@assets/images/DefaultPic.jpg'
import Logo from '@assets/images/Logo.png'
import './index.scss'

const Header = props => {
  const { title, childTitle } = props

  const {
    state: {
      profileDetails: { personalDetails: { profilePhoto, name } = {} } = {}
    },
    dispatch
  } = useStore()

  const handleLogout = async () => {
    try {
      await callUserSignOutApi()
      dispatch(userAuthSuccessAction({}))
      addToaster('success', 'Logged Out Successfully')
      history.push(AUTH_ROUTE)
    } catch (error) {
      addToaster('error', error.message)
    }
  }

  return (
    <>
      <div className='Headerbar'>
        <Container>
          <div className='NavBar'>
            <Link to={HOME_ROUTE} className='Logo'>
              <img
                alt='Profile Photo'
                src={Logo}
                className='d-inline-block align-top'
              />
            </Link>

            <div className='align-items-center RightNav'>
              <div className='LoginUserDetails'>
                {isUserLoggedIn() ? (
                  <>
                    <NavDropdown
                      title={
                        <img
                          src={profilePhoto || DefaultPic}
                          className='UserProfilePic'
                        />
                      }
                      className='ProfileMenu'
                    >
                      <Link
                        to={`${DASHBOARD_ROUTE}${PRODUCTS_ROUTE}`}
                        className='DeopdownLink'
                      >
                        Dashboard
                      </Link>
                      <Link
                        to={`${DASHBOARD_ROUTE}${MY_PROFILE_ROUTE}`}
                        className='DeopdownLink'
                      >
                        My Profile
                      </Link>

                      <NavDropdown.Divider />
                      <span onClick={handleLogout} className='DeopdownLink'>
                        Logout
                      </span>
                    </NavDropdown>
                  </>
                ) : (
                  <Button href={AUTH_ROUTE}>Sign In</Button>
                )}
              </div>
              {isUserLoggedIn() && <span className='DeopdownLink'>{name}</span>}
            </div>
          </div>
        </Container>
      </div>
      {title && (
        <Container>
          <div className='SubHeader'>
            <span>
              {title}
              <span className='ChildTitle'>
                {childTitle && `/ ${childTitle}`}
              </span>
            </span>
          </div>
        </Container>
      )}
    </>
  )
}

export default Header
