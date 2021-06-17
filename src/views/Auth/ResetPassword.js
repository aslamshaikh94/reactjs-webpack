import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { callUserPasswordResetApi } from '@api/'
import { LOGIN_ROUTE } from '@constants/routes'
import { ERROR_MESSAGES } from '@constants/'
import { validateEmail } from '@utils'
import { Button } from 'react-bootstrap'
import { InputField } from '@shared/FormFields'
import LoginbgURL from '@assets/images/loginbg.jpg'

const ResetPassword = () => {
  const [error, setError] = useState('')
  const [user, setUser] = useState({
    email: ''
  })
  const { email } = user

  const handleChange = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
    setError('')
  }

  const { emailErrorMessage } = ERROR_MESSAGES

  const isFormValid = () => {
    let validEmail
    if (!validateEmail(email)) {
      validEmail = emailErrorMessage
    }
    if (validEmail) {
      setError(validEmail)
      return false
    } else {
      return true
    }
  }

  const handleSubmit = async () => {
    if (isFormValid()) {
      await callUserPasswordResetApi(email)
    }
  }

  return (
    <div className='Auth'>
      <div className='FormWrapper'>
        <h3>Reset Password</h3>
        <div className='FromGroup'>
          <InputField
            label='Email'
            name='email'
            value={email}
            error={error}
            onChange={handleChange}
          />
          <Button variant='dark' size='lg' block onClick={handleSubmit}>
            Submit
          </Button>

          <Link to={LOGIN_ROUTE} className='ResetPassword Link'>
            Sign In
          </Link>
        </div>
      </div>
      <div className='Image'>
        <img src={LoginbgURL} />
      </div>
    </div>
  )
}

export default ResetPassword
