import React, { Suspense } from 'react'
import { useStore } from '@store'
import history from '@history/'
import Loader from '@shared/Loader'
import Header from '@shared/Header'
// import PrivateRoute from '@shared/PrivateRoute'
import { Router, Switch, Route } from 'react-router-dom'
import { HOME_ROUTE } from '@constants/routes'
import Home from '@views/Home'
import NotFound from '@views/NotFound'
import './style.scss'

const App = () => {
  const {
    dispatch,
    state: { isAppLoading = false, snackbarData = {} }
  } = useStore()
  const { visible, message, type } = snackbarData

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Router history={history}>
          <Header />
          <Switch>
            <Route path={HOME_ROUTE} component={Home} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Suspense>
    </>
  )
}

export default App
