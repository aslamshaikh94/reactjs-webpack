import React, { Suspense, lazy } from 'react'
import { useStore } from '@store/'
import Loader from '@shared/Loader'
import PrivateRoute from '@shared/PrivateRoute'
import { Router, Switch, Route } from 'react-router-dom'
import {
  HOME_ROUTE,
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  RESET_PASSWORD_ROUTE,
  REGISTER_ROUTE,
  SEARCH_ROUTE,
  REGISTER_COMPANY_ROUTE,
  PRODUCTS_ROUTE
} from '@constants/routes'
import history from '@history/'
import Header from '@src/components/Header'
import Footer from '@src/components/Footer'
import { ToastContainer } from 'react-toastify'
const Auth = lazy(() => import('@views/Auth'))
const Home = lazy(() => import('@views/Home'))
const Dashboard = lazy(() => import('@views/Dashboard'))
const NotFound = lazy(() => import('@views/NotFound'))
const ResetPassword = lazy(() => import('@views/Auth/ResetPassword'))
const Register = lazy(() => import('@views/Auth/Register'))
const CompanyRegister = lazy(() => import('@views/Auth/CompanyRegister'))
const SearchResults = lazy(() => import('@views/SearchResults'))
const ProductDetails = lazy(() => import('@views/ProductDetails'))

import './style.scss'

const App = () => {
  const {
    state: { isAppLoading }
  } = useStore()

  return (
    <div>
      {isAppLoading && <Loader />}
      <Router history={history}>
        <Header />
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path={HOME_ROUTE} component={Home} />
            <Route exact path={SEARCH_ROUTE} component={SearchResults} />
            <Route exact path={LOGIN_ROUTE} component={Auth} />
            <Route exact path={REGISTER_ROUTE} component={Register} />
            <PrivateRoute path={DASHBOARD_ROUTE} component={Dashboard} />
            <Route
              exact
              path={`${PRODUCTS_ROUTE}/:id`}
              component={ProductDetails}
            />
            <Route
              exact
              path={RESET_PASSWORD_ROUTE}
              component={ResetPassword}
            />
            <Route
              exact
              path={REGISTER_COMPANY_ROUTE}
              component={CompanyRegister}
            />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
