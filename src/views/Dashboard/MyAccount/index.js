import React, { useState } from 'react'
import { callSetUserDetailsApi } from '@api'
import { ERROR_MESSAGES } from '@constants/'
import { useStore } from '@store'
import { validateEmail, getInputVal } from '@utils'
import { Button, Row, Col } from 'react-bootstrap'
import { InputField, PhoneInputField } from '@shared/FormFields'
import PageTitle from '@shared/PageTitle'
import PageWrapper from '@shared/PageWrapper'
import Modal from '@shared/Modal'
import ProductImagesGallery from '@shared/ProductImagesGallery'
import './index.scss'

const MyAccount = () => {
  const {
    state: {
      loggedInUserData: { uid, email: userEmail } = {},
      profileDetails: { companyDetails, personalDetails } = {}
    }
  } = useStore()

  const [error, setError] = useState({})
  const [isModal, setIsModal] = useState(false)

  const [myAccount, setMyAccount] = useState({
    email: userEmail,
    ...companyDetails,
    ...personalDetails
  })

  const {
    companyName = '',
    profilePhoto = '',
    taxId = '',
    streetName = '',
    number = '',
    postcode = '',
    firstName = '',
    lastName = '',
    city = '',
    country = '',
    email = '',
    isSupplier,
    phoneData = {}
  } = myAccount

  const { phone } = phoneData

  const payload = {
    companyDetails: {
      companyName,
      taxId,
      streetName,
      number,
      postcode,
      city,
      phoneData,
      country
    },
    personalDetails: {
      firstName,
      lastName,
      profilePhoto,
      email
    }
  }

  const handleChange = e => {
    const { name, value, type, max } = e.target
    const val = getInputVal(value, type, max)
    if (val === false) return false
    else {
      setMyAccount({ ...myAccount, [name]: val })
      setError({ ...error, [name]: '' })
    }
  }

  const handlePhone = (value, data) => {
    setMyAccount({
      ...myAccount,
      phoneData: {
        rawPhone: value.slice(data.dialCode.length),
        phone: value,
        ...data
      }
    })
    setError({ ...error, phone: '' })
  }

  const handleSelectedImages = images => {
    const [imgUrl] = images
    setMyAccount({ ...myAccount, profilePhoto: imgUrl })
  }

  const {
    emailErrorMessage,
    countryErrorMessage,
    companyNameErrorMessage,
    taxIdErrorMessage,
    streetNameErrorMessage,
    numberErrorMessage,
    postcodeErrorMessage,
    firstNameErrorMessage,
    lastNameErrorMessage,
    cityErrorMessage
  } = ERROR_MESSAGES

  const isFormValid = () => {
    let isFirstName
    let isLastName
    let isCompanyName
    let isTaxId
    let isStreetName
    let isNumber
    let isPostcode
    let isCity
    let isCountry
    let isEmail

    if (!firstName) isFirstName = firstNameErrorMessage
    if (!lastName) isLastName = lastNameErrorMessage
    if (!companyName) isCompanyName = companyNameErrorMessage
    if (!validateEmail(email)) isEmail = emailErrorMessage
    if (isSupplier) {
      if (!taxId) isTaxId = taxIdErrorMessage
      if (!streetName) isStreetName = streetNameErrorMessage
      if (!number) isNumber = numberErrorMessage
      if (!postcode) isPostcode = postcodeErrorMessage
      if (!city) isCity = cityErrorMessage
      if (!country) isCountry = countryErrorMessage
    }

    if (
      isFirstName ||
      isLastName ||
      isCompanyName ||
      isTaxId ||
      isStreetName ||
      isEmail ||
      isNumber ||
      isPostcode ||
      isCity ||
      isCountry
    ) {
      setError({
        ...error,
        firstName: isFirstName,
        lastName: isLastName,
        companyName: isCompanyName,
        taxId: isTaxId,
        streetName: isStreetName,
        number: isNumber,
        postcode: isPostcode,
        city: isCity,
        country: isCountry,
        email: isEmail
      })
      return false
    } else {
      return true
    }
  }

  const handleSubmit = async () => {
    if (isFormValid()) {
      await callSetUserDetailsApi(uid, payload)
    }
  }

  return (
    <>
      <PageTitle title='My Account' />
      <Row>
        <Col lg={8}>
          <PageWrapper>
            <div className='Vendor'>
              <h6>Personal Details:</h6>
              <Row>
                <Col lg={6}>
                  <InputField
                    label='First Name'
                    name='firstName'
                    value={firstName}
                    error={error.firstName}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6}>
                  <InputField
                    label='Last Name'
                    name='lastName'
                    value={lastName}
                    error={error.lastName}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Company Name'
                    name='companyName'
                    value={companyName}
                    error={error.companyName}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Email'
                    name='email'
                    value={email}
                    type='email'
                    disabled
                    error={error.email}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              {isSupplier && (
                <>
                  <hr />
                  <h6>Company Details:</h6>
                  <Row>
                    <Col lg={6} sm={12}>
                      <InputField
                        label='Complete VAT / Tax ID Number'
                        name='taxId'
                        value={taxId}
                        error={error.taxId}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col lg={6} sm={12}>
                      <InputField
                        label='Street Name'
                        name='streetName'
                        value={streetName}
                        error={error.streetName}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col lg={6} sm={12}>
                      <InputField
                        label='Number'
                        name='number'
                        value={number}
                        error={error.number}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col lg={6} sm={12}>
                      <InputField
                        label='Post Code'
                        name='postcode'
                        value={postcode}
                        error={error.postcode}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col lg={6} sm={12}>
                      <InputField
                        label='City'
                        name='city'
                        value={city}
                        error={error.city}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col lg={6}>
                      <PhoneInputField
                        label='Phone'
                        name='phone'
                        country={'in'}
                        value={phone}
                        onChange={handlePhone}
                        error={error.phone}
                      />
                    </Col>
                    <Col lg={6} sm={12}>
                      <InputField
                        label='Country'
                        name='country'
                        value={country}
                        error={error.country}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </>
              )}
            </div>
          </PageWrapper>
        </Col>
        <Col lg={4}>
          <PageWrapper>
            <div className='ProfilePhoto'>
              <h6>Profile Photo</h6>
              {profilePhoto && (
                <img src={profilePhoto} className='DisplayImage' />
              )}
              <Button block onClick={() => setIsModal(true)}>
                Set profile photo
              </Button>
            </div>
          </PageWrapper>
        </Col>
      </Row>

      <div className='ButtonGroup FixedBottom'>
        <Button variant='primary' onClick={handleSubmit}>
          Save
        </Button>
      </div>
      <Modal
        footerHide
        title='Product image gallery'
        isOpen={isModal}
        onCloseModal={() => setIsModal(false)}
      >
        <ProductImagesGallery
          onSelect={handleSelectedImages}
          selected={[profilePhoto]}
          single
          onCloseModal={() => setIsModal(false)}
        />
      </Modal>
    </>
  )
}

export default MyAccount
