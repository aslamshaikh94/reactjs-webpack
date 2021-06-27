import React, { useState } from 'react'
import history from '@history'
import { useStore } from '@store/'
import { callSetUserDetailsApi } from '@api'
import { DASHBOARD_ROUTE } from '@constants/routes'
import { TAX_SUBTEXT } from '@constants/'
import { InputField, PhoneInputField } from '@shared/FormFields'
import { Button, Row, Col } from 'react-bootstrap'
import LoginbgURL from '@assets/images/loginbg.jpg'
import './index.scss'

const RegisterCompany = () => {
  const {
    state: {
      loggedInUserData: { uid },
      profileDetails: { companyDetails = {} } = {}
    }
  } = useStore()

  const [error, setError] = useState({})

  const [user, setUser] = useState(companyDetails)

  const {
    taxId,
    streetName,
    number,
    postcode,
    city,
    phoneData = {},
    country
  } = user
  const { phone } = phoneData

  const handleChange = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
    setError({ ...error, [name]: '' })
  }

  const handlePhone = (value, data) => {
    setUser({
      ...user,
      phoneData: {
        rawPhone: value.slice(data.dialCode.length),
        phone: value,
        ...data
      }
    })
    setError({ ...error, phone: '' })
  }

  const isFormValid = () => {
    let isTaxId
    let isStreetName
    let isNumber
    let isPostcode
    let isCity
    let isPhone
    let isCountry

    if (!taxId) {
      isTaxId = 'Please enter VAT/TAX ID'
    }
    if (!streetName) {
      isStreetName = 'Please enter street name'
    }
    if (!number) {
      isNumber = 'Please enter number'
    }
    if (!postcode) {
      isPostcode = 'Please enter number'
    }
    if (!city) {
      isCity = 'Please enter city'
    }
    if (!phone) {
      isPhone = 'Please enter phone'
    }
    if (!country) {
      isCountry = 'Please enter country'
    }

    if (
      isTaxId ||
      isStreetName ||
      isNumber ||
      isPostcode ||
      isCity ||
      isPhone ||
      isCountry
    ) {
      setError({
        ...error,
        taxId: isTaxId,
        streetName: isStreetName,
        number: isNumber,
        postcode: isPostcode,
        city: isCity,
        phone: isPhone,
        country: isCountry
      })
      return false
    } else {
      return true
    }
  }

  const payload = {
    companyDetails: {
      taxId,
      streetName,
      number,
      postcode,
      city,
      phone,
      country
    }
  }

  const handleSubmit = async () => {
    if (uid && isFormValid()) {
      const { status } = await callSetUserDetailsApi(uid, payload)
      if (status === 200) {
        history.push(DASHBOARD_ROUTE)
      }
    }
  }

  return (
    <div className='Auth'>
      <div className='FormWrapper'>
        <h3 className='Heading'>Register Your Company</h3>
        <div className='FromGroup'>
          <Row>
            <Col lg={12}>
              <InputField
                label='Complete VAT / Tax ID Number'
                name='taxId'
                value={taxId}
                subtext={TAX_SUBTEXT}
                error={error.taxId}
                onChange={handleChange}
              />
            </Col>
            <Col lg={7}>
              <InputField
                label='Street Name'
                name='streetName'
                value={streetName}
                error={error.streetName}
                onChange={handleChange}
              />
            </Col>
            <Col lg={5}>
              <InputField
                label='Number'
                labelSmall='- Optional'
                name='number'
                value={number}
                error={error.number}
                onChange={handleChange}
              />
            </Col>
            <Col lg={5}>
              <InputField
                label='Post Code'
                name='postcode'
                value={postcode}
                error={error.postcode}
                onChange={handleChange}
              />
            </Col>
            <Col lg={7}>
              <InputField
                label='City'
                name='city'
                value={city}
                error={error.city}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <PhoneInputField
            label='Phone'
            name='phone'
            country={'in'}
            value={phone}
            onChange={handlePhone}
            error={error.phone}
          />
          <InputField
            label='Country'
            name='country'
            value={country}
            error={error.country}
            onChange={handleChange}
          />
          <Row>
            <Col lg={6}>
              <Button variant='dark' block onClick={handleSubmit}>
                Final Registration
              </Button>
            </Col>
            <Col lg={6}>
              <Button variant='light' block href={DASHBOARD_ROUTE}>
                Complete Later
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      <div className='Image'>
        <img src={LoginbgURL} />
      </div>
    </div>
  )
}

export default RegisterCompany
