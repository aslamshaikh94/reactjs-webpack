import React, { useEffect, useState } from 'react'
import history from '@history'
import {
  callUserSignupApi,
  callUserSigninApi,
  callCurrentUserTokenIdApi
} from '@api'
import { userAuthSuccessAction } from '@actions'
import { isUserLoggedIn } from '@utils'
import {
  HOME_ROUTE,
  DASHBOARD_ROUTE,
  MY_PROFILE_ROUTE,
  RESET_PASSWORD_ROUTE
} from '@constants/routes'
import { ERROR_MESSAGES } from '@constants/'
import { useStore } from '@store'
import { validatePassword, validateEmail } from '@utils'
import { Button } from 'react-bootstrap'
import { InputField } from '@shared/FormFields'
import { Link } from 'react-router-dom'
import Logo from '@assets/images/Logo.png'
import './index.scss'

const Auth = () => {
  const { dispatch } = useStore()

  const [error, setError] = useState({})
  const [isSignup, setIsSignup] = useState(false)
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const { email, password, confirmPassword } = user

  const handleChange = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
    setError({ ...error, [name]: '' })
  }

  const {
    passwordNotMatchErrorMessage,
    passwordErrorMessage,
    emailErrorMessage
  } = ERROR_MESSAGES

  const isFormValid = () => {
    let confirmPass
    let validPass
    let validEmail
    if (!validateEmail(email)) {
      validEmail = emailErrorMessage
    }
    if (!validatePassword(password)) {
      validPass = passwordErrorMessage
    }
    if (isSignup && password !== confirmPassword) {
      confirmPass = passwordNotMatchErrorMessage
    }
    if (confirmPass || validPass || validEmail) {
      setError({
        ...error,
        confirmPassword: confirmPass,
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

  const handleSignUp = async () => {
    if (isFormValid()) {
      const {
        user: { uid, displayName, email } = {}
      } = await callUserSignupApi({
        ...payload,
        isVendor: true
      })
      const jwtToken = await callCurrentUserTokenIdApi()
      dispatch(
        userAuthSuccessAction({
          uid,
          displayName,
          token: jwtToken,
          email
        })
      )
      history.push(`${DASHBOARD_ROUTE}${MY_PROFILE_ROUTE}`)
    }
  }

  const handleSignIn = async () => {
    if (isFormValid()) {
      const {
        user: { uid, displayName, email } = {}
      } = await callUserSigninApi(payload)
      const jwtToken = await callCurrentUserTokenIdApi()
      dispatch(
        userAuthSuccessAction({
          uid,
          displayName,
          token: jwtToken,
          email
        })
      )
      history.push(`${DASHBOARD_ROUTE}${MY_PROFILE_ROUTE}`)
    }
  }

  useEffect(() => {
    if (isUserLoggedIn()) history.push(`${DASHBOARD_ROUTE}${MY_PROFILE_ROUTE}`)
  }, [])

  return (
    <div className='Auth'>
      <div className='FormWrapper'>
        <img
          src={Logo}
          className='Logo'
          onClick={() => history.push(HOME_ROUTE)}
        />
        <h3>Sign {isSignup ? 'Up' : 'In'}</h3>
        <div className='FromGroup'>
          <InputField
            label='Email'
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
          {isSignup && (
            <>
              <InputField
                label='Confirm Password'
                name='confirmPassword'
                value={confirmPassword}
                type='password'
                error={error.confirmPassword}
                onChange={handleChange}
              />
            </>
          )}

          {isSignup ? (
            <Button variant='primary' size='lg' block onClick={handleSignUp}>
              Sign Up
            </Button>
          ) : (
            <Button variant='primary' size='lg' block onClick={handleSignIn}>
              Sign In
            </Button>
          )}
          <Link to={RESET_PASSWORD_ROUTE} className='ResetPassword Link'>
            Forgot Password
          </Link>
          <Button
            variant='link'
            size='lg'
            block
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? 'Already have an account?' : "Don't have account?"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Auth
