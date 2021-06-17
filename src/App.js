import React from 'react'
import Loader from '@shared/Loader'
import PrivateRoute from '@shared/PrivateRoute'
import { Router, Switch, Route } from 'react-router-dom'
import {
  HOME_ROUTE,
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  RESET_PASSWORD_ROUTE,
  REGISTER_ROUTE
} from '@constants/routes'
import history from '@history/'
import Auth from '@views/Auth'
import Home from '@views/Home'
import Dashboard from '@views/Dashboard'
import NotFound from '@views/NotFound'
import Header from '@src/components/Header'
import Footer from '@src/components/Footer'
import ResetPassword from '@views/Auth/ResetPassword'
import Register from '@views/Auth/Register'
import { ToastContainer } from 'react-toastify'
import './style.scss'

const App = () => {
  return (
    <div>
      <Router history={history}>
        <Header />
        <Switch>
          <Route exact path={HOME_ROUTE} component={Home} />
          <Route exact path={LOGIN_ROUTE} component={Auth} />
          <Route exact path={REGISTER_ROUTE} component={Register} />
          <PrivateRoute exact path={DASHBOARD_ROUTE} component={Dashboard} />
          <Route exact path={RESET_PASSWORD_ROUTE} component={ResetPassword} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
      <ToastContainer />
      <Loader />
    </div>
  )
}

export default App
