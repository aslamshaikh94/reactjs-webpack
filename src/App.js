import React from 'react'
import Loader from '@shared/Loader'
import PrivateRoute from '@shared/PrivateRoute'
import { Router, Switch, Route } from 'react-router-dom'
import {
  AUTH_ROUTE,
  RESET_PASSWORD_ROUTE,
  DASHBOARD_ROUTE,
  HOME_ROUTE,
  PRODUCTS_ROUTE
} from '@constants/routes'
import history from '@history/'
import Auth from '@views/Auth'
import Dashboard from '@views/Dashboard'
import ProductDetails from '@views/ProductDetails'
import NotFound from '@views/NotFound'
import ResetPassword from '@views/Auth/ResetPassword'
import { ToastContainer } from 'react-toastify'
import Home from '@views/Home'
import './style.scss'

const App = () => {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <PrivateRoute path={DASHBOARD_ROUTE} component={Dashboard} />
          <Route exact path={AUTH_ROUTE} component={Auth} />
          <Route exact path={RESET_PASSWORD_ROUTE} component={ResetPassword} />
          <Route exact path={HOME_ROUTE} component={Home} />
          <Route
            exact
            path={`${PRODUCTS_ROUTE}/:id`}
            component={ProductDetails}
          />

          <Route component={NotFound} />
        </Switch>
      </Router>
      <ToastContainer />
      <Loader />
    </div>
  )
}

export default App
