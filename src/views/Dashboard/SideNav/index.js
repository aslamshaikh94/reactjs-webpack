import React from 'react'
import { useStore } from '@store/'
import { NavLink, useRouteMatch } from 'react-router-dom'
import {
  MY_PROFILE_ROUTE,
  PRODUCTS_ROUTE,
  ORDERS_ROUTE
} from '@constants/routes'
import './index.scss'

const SideNav = () => {
  const {
    state: { profileDetails: { companyDetails: { isSupplier } = {} } = {} }
  } = useStore()

  const { url } = useRouteMatch()
  return (
    <div className='SideNav'>
      <NavLink to={`${url}/home`} className='Nav'>
        <i className='fa fa-home'></i> Home
      </NavLink>
      {isSupplier && (
        <>
          <NavLink to={`${url}${PRODUCTS_ROUTE}`} className='Nav'>
            <i className='fa fa-list'></i> Products
          </NavLink>
          <NavLink to={`${url}${ORDERS_ROUTE}`} className='Nav'>
            <i className='fa fa-shopping-basket'></i> Orders
          </NavLink>
        </>
      )}

      <NavLink to={`${url}${MY_PROFILE_ROUTE}`} className='Nav'>
        <i className='fa fa-user'></i> My Account
      </NavLink>
    </div>
  )
}

export default SideNav
