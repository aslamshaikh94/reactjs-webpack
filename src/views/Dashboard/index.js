import React, { useEffect } from 'react'
import { Router, Switch, Route, useRouteMatch } from 'react-router-dom'
import { callGetUserDetailsApi } from '@api/'
import { useStore } from '@store/'
import history from '@history/'
import {
  MY_PROFILE_ROUTE,
  PRODUCTS_ROUTE,
  ORDERS_ROUTE
} from '@constants/routes'
import Header from '@shared/Header'
import SideNav from './SideNav'
import MyAccount from './MyAccount'
import Products from './Products'
import Orders from './Orders'
import ProductForm from './Products/ProductForm'
import NotFound from '@views/NotFound'
import './index.scss'

const Dashboard = () => {
  const {
    state: { loggedInUserData: { uid } = {} }
  } = useStore()

  const getDetails = async () => {
    await callGetUserDetailsApi(uid)
  }

  useEffect(() => {
    getDetails()
  }, [])

  const { url } = useRouteMatch()

  return (
    <>
      <Header />
      <div className='Dashboard'>
        <SideNav />
        <div className='Wrapper'>
          <Router history={history}>
            <Switch>
              <Route path={`${url}${MY_PROFILE_ROUTE}`} component={MyAccount} />
              <Route
                path={`${url}${PRODUCTS_ROUTE}/edit/:id`}
                component={ProductForm}
              />
              <Route
                path={`${url}${PRODUCTS_ROUTE}/new`}
                component={ProductForm}
              />
              <Route path={`${url}${PRODUCTS_ROUTE}`} component={Products} />
              <Route path={`${url}${ORDERS_ROUTE}`} component={Orders} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </div>
      </div>
    </>
  )
}

export default Dashboard
