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

  const handleSignIn = async () => {
    if (isFormValid()) {
      const { user: { uid, displayName, email } = {} } =
        await callUserSigninApi(payload)
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

  useEffect(() => {
    if (isUserLoggedIn()) history.push(DASHBOARD_ROUTE)
  }, [])

  return (
    <div className='Auth'>
      <div className='FormWrapper'>
        <h3 className='Heading'>Sign {isSignup ? 'Up' : 'In'}</h3>
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

          <Button variant='dark' size='lg' block onClick={handleSignIn}>
            Submit
          </Button>
          <Link to={RESET_PASSWORD_ROUTE} className='ResetPassword Link'>
            Forgot Password
          </Link>
          <Button
            variant='link'
            size='md'
            block
            onClick={() => history.push(REGISTER_ROUTE)}
          >
            Don't have account?
          </Button>
        </div>
      </div>
      <div className='Image'>
        <img src={LoginbgURL} />
      </div>
    </div>
  )
}

export default Auth
