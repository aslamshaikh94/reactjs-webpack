import React, { useState } from 'react'
import { callSetUserDetailsApi } from '@api'
import { ERROR_MESSAGES } from '@constants/'
import { useStore } from '@store'
import { validateEmail, getInputVal } from '@utils'
import { Button, Row, Col } from 'react-bootstrap'
import { InputField } from '@shared/FormFields'
import PageTitle from '@shared/PageTitle'
import PageWrapper from '@shared/PageWrapper'
import Modal from '@shared/Modal'
import ProductImagesGallery from '@shared/ProductImagesGallery'
import './index.scss'

const MyAccount = () => {
  const {
    state: {
      loggedInUserData: { uid, email: userEmail } = {},
      profileDetails: { companyDetails, personalDetails, bankDetails } = {}
    }
  } = useStore()

  const [error, setError] = useState({})
  const [isModal, setIsModal] = useState(false)

  const [myAccount, setMyAccount] = useState({
    email: userEmail,
    ...companyDetails,
    ...personalDetails,
    ...bankDetails
  })

  const {
    companyName = '',
    profilePhoto = '',
    validCr = '',
    qatarId = '',
    tradeLicense = '',
    computerCard = '',
    name = '',
    address1 = '',
    address2 = '',
    city = '',
    state = '',
    zipCode = '',
    country = '',
    email = '',
    accountNumber = '',
    bankName = '',
    swiftCode = '',
    iban = '',
    branchLocation = ''
  } = myAccount

  const payload = {
    companyDetails: {
      companyName,
      validCr,
      qatarId,
      tradeLicense,
      computerCard
    },
    personalDetails: {
      name,
      profilePhoto,
      address1,
      address2,
      city,
      state,
      zipCode,
      country,
      email
    },
    bankDetails: {
      accountNumber,
      bankName,
      swiftCode,
      iban,
      branchLocation
    }
  }

  const handleChange = e => {
    const { name, value, type, max } = e.target
    const val = getInputVal(value, type, max)
    if (val===false) return false
    else {
      setMyAccount({ ...myAccount, [name]: val })
      setError({ ...error, [name]: '' })
    }
  }

  const handleSelectedImages = images => {
    const [imgUrl] = images
    setMyAccount({ ...myAccount, profilePhoto: imgUrl })
  }

  const {
    emailErrorMessage,
    // countryErrorMessage,
    companyNameErrorMessage,
    // validCrErrorMessage,
    // qatarIdErrorMessage,
    // tradeLicenseErrorMessage,
    // computerCardErrorMessage,
    nameErrorMessage
    // addressErrorMessage,
    // cityErrorMessage,
    // stateErrorMessage,
    // zipCodeErrorMessage,
    // accountNumberErrorMessage,
    // bankNameErrorMessage,
    // swiftCodeErrorMessage,
    // branchLocationErrorMessage
  } = ERROR_MESSAGES

  const isFormValid = () => {
    let isCompanyName
    let isValidCr
    let isQatarId
    let isTradeLicense
    let isComputerCard
    let isName
    let isAddress1
    let isAddress2
    let isCity
    let isState
    let isZipCode
    let isCountry
    let isEmail
    let isAccountNumber
    let isBankName
    let isswiftCode
    let isBranchLocation

    if (!companyName) isCompanyName = companyNameErrorMessage
    // if (!validCr) isValidCr = validCrErrorMessage
    // if (!qatarId) isQatarId = qatarIdErrorMessage
    // if (!tradeLicense) isTradeLicense = tradeLicenseErrorMessage
    // if (!computerCard) isComputerCard = computerCardErrorMessage
    if (!name) isName = nameErrorMessage
    // if (!address1) isAddress1 = addressErrorMessage
    // if (!address2) isAddress2 = addressErrorMessage
    // if (!city) isCity = cityErrorMessage
    // if (!state) isState = stateErrorMessage
    // if (!zipCode) isZipCode = zipCodeErrorMessage
    // if (!country) isCountry = countryErrorMessage
    if (!validateEmail(email)) isEmail = emailErrorMessage
    // if (!accountNumber) isAccountNumber = accountNumberErrorMessage
    // if (!bankName) isBankName = bankNameErrorMessage
    // if (!swiftCode) isswiftCode = swiftCodeErrorMessage
    // if (!branchLocation) isBranchLocation = branchLocationErrorMessage

    if (
      isCompanyName ||
      isValidCr ||
      isQatarId ||
      isEmail ||
      isTradeLicense ||
      isComputerCard ||
      isName ||
      isAddress1 ||
      isAddress2 ||
      isCity ||
      isState ||
      isZipCode ||
      isCountry ||
      isAccountNumber ||
      isBankName ||
      isswiftCode ||
      isBranchLocation
    ) {
      setError({
        ...error,
        companyName: isCompanyName,
        validCr: isValidCr,
        qatarId: isQatarId,
        tradeLicense: isTradeLicense,
        computerCard: isComputerCard,
        name: isName,
        address1: isAddress1,
        address2: isAddress2,
        city: isCity,
        state: isState,
        zipCode: isZipCode,
        country: isCountry,
        accountNumber: isAccountNumber,
        bankName: isBankName,
        swiftCode: isswiftCode,
        branchLocation: isBranchLocation,
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
              <h6>Company Details:</h6>
              <Row>
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
                    label='Valid CR'
                    name='validCr'
                    value={validCr}
                    error={error.validCr}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Qatar ID'
                    name='qatarId'
                    value={qatarId}
                    type='number'
                    error={error.qatarId}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Trade License'
                    name='tradeLicense'
                    value={tradeLicense}
                    error={error.tradeLicense}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Computer Card'
                    name='computerCard'
                    value={computerCard}
                    type='number'
                    max={8}
                    error={error.computerCard}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <hr />
              <h6>Personal Details:</h6>
              <Row>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Name'
                    name='name'
                    value={name}
                    error={error.name}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Address 1'
                    name='address1'
                    value={address1}
                    error={error.address1}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Address 2'
                    name='address2'
                    value={address2}
                    error={error.address2}
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
                <Col lg={6} sm={12}>
                  <InputField
                    label='State'
                    name='state'
                    value={state}
                    error={error.state}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Zip Code'
                    name='zipCode'
                    value={zipCode}
                    type='number'
                    error={error.zipCode}
                    onChange={handleChange}
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
                <Col lg={6} sm={12}>
                  <InputField
                    label='Email'
                    name='email'
                    value={email}
                    type='email'
                    error={error.email}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <hr />
              <h6>Bank Details:</h6>
              <Row>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Account Number'
                    name='accountNumber'
                    value={accountNumber}
                    type='number'
                    error={error.accountNumber}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Bank Name'
                    name='bankName'
                    value={bankName}
                    error={error.bankName}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Swift Code'
                    name='swiftCode'
                    value={swiftCode}
                    error={error.swiftCode}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='IBAN'
                    name='iban'
                    value={iban}
                    error={error.iban}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Branch Location'
                    name='branchLocation'
                    value={branchLocation}
                    error={error.branchLocation}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
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
