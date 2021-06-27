import React, { useEffect, useState } from 'react'
import { useStore } from '@store/'
import { getInputVal } from '@utils/'
import { DASHBOARD_ROUTE, PRODUCTS_ROUTE } from '@constants/routes'
import {
  callAddProductApi,
  callGetUserProductApi,
  callEditProductApi,
  callGetProductCategoriesApi
} from '@api/product'
import { userSetProductSuccessAction } from '@actions/'
import PageTitle from '@shared/PageTitle'
import PageWrapper from '@shared/PageWrapper'
import { InputField } from '@shared/FormFields'
import Modal from '@shared/Modal'
import ProductImagesGallery from '@shared/ProductImagesGallery'
import { Row, Col, Button } from 'react-bootstrap'
import { useParams, useRouteMatch } from 'react-router'
import './index.scss'

const ProductForm = () => {
  const {
    state: { loggedInUserData: { uid } = {} },
    dispatch
  } = useStore()

  const { id } = useParams()

  const [error, setError] = useState({})
  const [isModal, setIsModal] = useState(false)
  const [product, setProduct] = useState({})

  const getProduct = async () => {
    const data = await callGetUserProductApi(uid, id)
    if (data) dispatch(userSetProductSuccessAction(data))
    setProduct(data)
  }

  useEffect(() => {
    if (id) getProduct()
  }, [])

  const {
    materialCasNo,
    materialName,
    application,
    hsnCode,
    unitMeasure,
    handingAdvice,
    storageAdvice,
    specification,
    pesoLicense,
    pisonLicense,
    hallaliLicense,
    kosherLicense,
    famiqs,
    isoCertificate,
    msdsCertificate,
    productImage,
    gallery = []
  } = product

  const handleChange = e => {
    const { name, value, type, max } = e.target
    const val = getInputVal(value, type, max)
    if (val === false) return false
    else {
      setProduct({ ...product, [name]: val })
      setError({ ...error, [name]: '' })
    }
  }

  const handleSelectedImages = images => {
    setProduct({ ...product, gallery: images, productImage: images[0] })
  }

  const handleSelectDisplayImage = i => {
    setProduct({ ...product, productImage: gallery[i] })
  }

  const payload = {
    ...product,
    uid
  }

  const handleSubmit = async save => {
    const data = { ...payload, isPublish: save }
    if (id) {
      await callEditProductApi(uid, id, data)
    } else {
      await callAddProductApi(uid, data)
    }
  }

  return (
    <>
      <PageTitle
        title='Product'
        onback={`${DASHBOARD_ROUTE}${PRODUCTS_ROUTE}`}
      />
      <Row>
        <Col lg={8}>
          <PageWrapper>
            <div className='ProductForm'>
              <h6>Product Master</h6>
              <Row>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Material CAS NO *'
                    name='materialCasNo'
                    value={materialCasNo}
                    error={error.materialCasNo}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Material Name *'
                    name='materialName'
                    value={materialName}
                    error={error.materialName}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Application *'
                    name='application'
                    value={application}
                    error={error.application}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='HSN Code *'
                    name='hsnCode'
                    value={hsnCode}
                    error={error.hsnCode}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Unit of Measure *'
                    name='unitMeasure'
                    value={unitMeasure}
                    error={error.unitMeasure}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Handing Advice'
                    name='handingAdvice'
                    value={handingAdvice}
                    error={error.handingAdvice}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Storage Advice'
                    name='storageAdvice'
                    value={storageAdvice}
                    error={error.storageAdvice}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <hr />
              <h6>Certification</h6>
              <Row>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Specification'
                    name='specification'
                    value={specification}
                    error={error.specification}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='PESO License'
                    name='pesoLicense'
                    value={pesoLicense}
                    error={error.pesoLicense}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Pison License'
                    name='pisonLicense'
                    value={pisonLicense}
                    error={error.pisonLicense}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Hallali License'
                    name='hallaliLicense'
                    value={hallaliLicense}
                    error={error.hallaliLicense}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Kosher License'
                    name='kosherLicense'
                    value={kosherLicense}
                    error={error.kosherLicense}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='FAMIQS'
                    name='famiqs'
                    value={famiqs}
                    error={error.famiqs}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='ISO  9000/15000/22000'
                    name='isoCertificate'
                    value={isoCertificate}
                    error={error.isoCertificate}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='MSDS'
                    name='msdsCertificate'
                    value={msdsCertificate}
                    error={error.msdsCertificate}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </div>
          </PageWrapper>
        </Col>
        <Col lg={4}>
          <PageWrapper>
            <div className='ProductImages'>
              <h6>Product Images</h6>
              {productImage && (
                <img src={productImage} className='DisplayImage' />
              )}
              {gallery.length > 0 && (
                <div className='Gallery'>
                  {gallery.map((img, i) => (
                    <img
                      src={img}
                      key={i}
                      className={`Thumb ${
                        img === productImage ? 'Active' : ''
                      }`}
                      onClick={() => handleSelectDisplayImage(i)}
                    />
                  ))}
                </div>
              )}
              <Button block onClick={() => setIsModal(true)}>
                Set product image
              </Button>
            </div>
          </PageWrapper>
        </Col>
      </Row>

      <div className='ButtonGroup FixedBottom'>
        <Button variant='primary' onClick={() => handleSubmit(false)}>
          Save & Draft
        </Button>
        <Button variant='primary' onClick={() => handleSubmit(true)}>
          Save & Publish
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
          selected={gallery}
          onCloseModal={() => setIsModal(false)}
        />
      </Modal>
    </>
  )
}

export default ProductForm
