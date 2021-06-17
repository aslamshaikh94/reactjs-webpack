import React, { useState } from 'react'
import { useStore } from '@store/'
import history from '@history'
import { callUserSignupApi, callCurrentUserTokenIdApi } from '@api'
import { userAuthSuccessAction } from '@actions'
import { validatePassword, validateEmail } from '@utils'
import {
  DASHBOARD_ROUTE,
  RESET_PASSWORD_ROUTE,
  LOGIN_ROUTE
} from '@constants/routes'
import { ERROR_MESSAGES } from '@constants/'
import { InputField } from '@shared/FormFields'
import { Link } from 'react-router-dom'
import { Button, Row, Col } from 'react-bootstrap'
import LoginbgURL from '@assets/images/loginbg.jpg'
import './index.scss'

const Register = () => {
  const { dispatch } = useStore()

  const [error, setError] = useState({})

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
    if (password !== confirmPassword) {
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
      const { user: { uid, displayName, email } = {} } =
        await callUserSignupApi({
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
      history.push(DASHBOARD_ROUTE)
    }
  }

  return (
    <div className='Auth'>
      <div className='FormWrapper'>
        <h3 className='Heading'>Register</h3>
        <div className='FromGroup'>
          <Row>
            <Col lg={6}>
              <InputField
                label='First Name'
                name='firstName'
                value={email}
                error={error.email}
                onChange={handleChange}
              />
            </Col>
            <Col lg={6}>
              <InputField
                label='Last Name'
                name='firstName'
                value={email}
                error={error.email}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <InputField
            label='Company Name'
            name='firstName'
            value={email}
            error={error.email}
            onChange={handleChange}
          />
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
          <InputField
            label='Confirm Password'
            name='confirmPassword'
            value={confirmPassword}
            type='password'
            error={error.confirmPassword}
            onChange={handleChange}
          />

          <Button variant='dark' size='lg' block onClick={handleSignUp}>
            Submit
          </Button>

          <Link to={RESET_PASSWORD_ROUTE} className='ResetPassword Link'>
            Forgot Password
          </Link>
          <Button
            variant='link'
            size='md'
            block
            onClick={() => history.push(LOGIN_ROUTE)}
          >
            Already have an account?
          </Button>
        </div>
      </div>
      <div className='Image'>
        <img src={LoginbgURL} />
      </div>
    </div>
  )
}

export default Register
