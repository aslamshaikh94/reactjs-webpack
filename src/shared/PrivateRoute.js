import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { isUserLoggedIn } from '@utils'
import { LOGIN_ROUTE } from '@constants/routes'

const PrivateRoute = ({ component: Comp, ...props }) => {
  return (
    <Route
      {...props}
      render={() => {
        return isUserLoggedIn() ? (
          <Comp />
        ) : (
          <Switch>
            <Redirect
              to={{
                pathname: LOGIN_ROUTE
              }}
            />
          </Switch>
        )
      }}
    />
  )
}

export default PrivateRoute
