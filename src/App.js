import React, { Suspense } from 'react'
import history from '@history/'
import Loader from '@shared/Loader'
import { Router, Switch, Route } from 'react-router-dom'
import { HOME_ROUTE } from '@constants/routes'
import Home from '@views/Home'
import NotFound from '@views/NotFound'
import './style.scss'

const App = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Router history={history}>
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
