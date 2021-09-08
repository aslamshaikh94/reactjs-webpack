import React from 'react'
import { isUserLoggedIn } from '@utils'
import { AUTH_ROUTE } from '@constants/routes'

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
                pathname: AUTH_ROUTE
              }}
            />
          </Switch>
        )
      }}
    />
  )
}

export default PrivateRoute
