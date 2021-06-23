import React, { useEffect, useState } from 'react'
import history from '@history'
import { callUserSigninApi, callCurrentUserTokenIdApi } from '@api'
import { userAuthSuccessAction } from '@actions'
import { isUserLoggedIn } from '@utils'
import {
  DASHBOARD_ROUTE,
  REGISTER_ROUTE,
  RESET_PASSWORD_ROUTE
} from '@constants/routes'
import { ERROR_MESSAGES } from '@constants/'
import { useStore } from '@store'
import { validatePassword, validateEmail } from '@utils'
import { Button } from 'react-bootstrap'
import { InputField } from '@shared/FormFields'
import { Link } from 'react-router-dom'
import LoginbgURL from '@assets/images/loginbg.jpg'
import './index.scss'

const Auth = () => {
  const { dispatch } = useStore()

  const [error, setError] = useState({})
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const { email, password } = user

  const handleChange = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
    setError({ ...error, [name]: '' })
  }

  const { passwordErrorMessage, emailErrorMessage } = ERROR_MESSAGES

  const isFormValid = () => {
    let validPass
    let validEmail
    if (!validateEmail(email)) {
      validEmail = emailErrorMessage
    }
    if (!validatePassword(password)) {
      validPass = passwordErrorMessage
    }
    if (validPass || validEmail) {
      setError({
        ...error,
        password: validPass,
        email: validEmail
      })
      return false
    } else {
      return true
    }
  }

  const payload = {
    email,
    password
  }

  const handleSignIn = async () => {
    if (isFormValid()) {
      const { status, data = {} } = await callUserSigninApi(payload)
      const { user: { uid, displayName, email } = {} } = data
      if (status === 200) {
        const jwtToken = await callCurrentUserTokenIdApi()
        dispatch(
          userAuthSuccessAction({
            uid,
            displayName,
            token: jwtToken,
            email
          })
        )
        history.push(DASHBOARD_ROUTE)
      }
    }
  }

  useEffect(() => {
    if (isUserLoggedIn()) history.push(DASHBOARD_ROUTE)
  }, [])

  return (
    <div className='Auth'>
      <div className='FormWrapper'>
        <h3 className='Heading'>Sign </h3>
        <div className='FromGroup'>
          <InputField
            label='Email address'
            name='email'
            value={email}
            error={error.email}
            onChange={handleChange}
          />
          <InputField
            label='Password'
            name='password'
            value={password}
            type='password'
            error={error.password}
            onChange={handleChange}
          />
          <Button variant='dark' block onClick={handleSignIn}>
            Submit
          </Button>
          <Link to={RESET_PASSWORD_ROUTE} className='ResetPassword Link'>
            Forgot Password
          </Link>
          <p className='LinkText'>
            Not a member? <Link to={REGISTER_ROUTE}>Sign up</Link> now
          </p>
        </div>
      </div>
      <div className='Image'>
        <img src={LoginbgURL} />
      </div>
    </div>
  )
}

export default Auth
