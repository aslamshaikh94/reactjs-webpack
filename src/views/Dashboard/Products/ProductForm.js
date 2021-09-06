import React, { useEffect, useState } from 'react'
import { useStore } from '@store/'
import { getInputVal } from '@utils/'
import {
  callAddProductApi,
  callGetUserProductApi,
  callEditProductApi,
  callGetProductCategoriesApi
} from '@api/product'
import { userSetProductSuccessAction } from '@actions/'
import PageTitle from '@shared/PageTitle'
import PageWrapper from '@shared/PageWrapper'
import {
  InputField,
  SelectField,
  CheckBox,
  Label,
  InputTags
} from '@shared/FormFields'
import TextEditor from '@shared/FormFields/TextEditor'
import Modal from '@shared/Modal'
import ProductImagesGallery from '@shared/ProductImagesGallery'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { useParams } from 'react-router'
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
  const [focusInput, setFocusInput] = useState(0)

  const getProduct = async () => {
    const data = await callGetUserProductApi(uid, id)

    if (data) dispatch(userSetProductSuccessAction(data))
    setProduct(data)
  }
  const [category, setCategory] = useState({})

  const getCategories = async () => {
    const data = await callGetProductCategoriesApi()
    setCategory(data)
  }

  

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    if (id) getProduct()
  }, [])

  const {
    title,
    categories,
    subCategory,
    productTags,
    description,
    regularPrice,
    salePrice,
    costPerItem,
    quantity,
    sku,
    trackQuantity,
    weight,
    length,
    width,
    height,
    continueSelling,
    productImage,
    isVariants,
    variants = [],
    gallery = [],
    options: optionsData
  } = product

  const [options, setOptions] = useState([{ optionName: 'Size', tags: [] }])

  useEffect(() => {
    optionsData && setOptions(optionsData)
  }, [optionsData])

  const handleChange = e => {
    const { name, value, type, max } = e.target
    const val = getInputVal(value, type, max)
    if (val===false) return false
    else {
      setProduct({ ...product, [name]: val })
      setError({ ...error, [name]: '' })
    }
  }

  const handleChecked = e => {
    const { name, checked } = e.target
    setProduct({ ...product, [name]: checked })
  }

  const handleSelectedImages = images => {
    setProduct({ ...product, gallery: images, productImage: images[0] })
  }

  const handleSelectDisplayImage = i => {
    setProduct({ ...product, productImage: gallery[i] })
  }

  const handleVariantChange = e => {
    const { name, value } = e.target
    const filterVariants = variants.map((item, i) => {
      if (i === focusInput) {
        return { ...item, [name]: value }
      } else return item
    })
    setProduct({ ...product, variants: filterVariants })
  }

  const handleChangeOption = e => {
    const { name, value } = e.target
    const filterOps = options.map((item, i) => {
      if (i === focusInput) {
        return { ...item, [name]: value }
      } else return item
    })
    setOptions(filterOps)
  }

  const selectedTags = (tags, index) => {
    const filterOps = options.map((item, i) => {
      if (i === index) {
        return { ...item, tags }
      } else return item
    })
    setOptions(filterOps)
  }

  const handleAddOption = () => {
    setOptions([...options, { optionName: 'Size', tags: [] }])
  }

  useEffect(() => {
    function reducer(data) {
      const arr = data.map(item => item.tags)
      return arr.reduce((a, b) =>
        a.reduce((r, v) => r.concat(b.map(w => [].concat(v, w))), [])
      )
    }

    let output = options.length > 0 && reducer(options)
    const filterVariants = output.map(item => {
      return { variant: Array.isArray(item) ? item.join('/') : item }
    })

    setProduct({ ...product, variants: filterVariants })
  }, [options])

  const handleRemove = index => {
    if (options.length > 1) {
      let removedItem = options.filter((_, i) => i !== index)
      setOptions(removedItem)
    }
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
      <PageTitle title='Product' />
      <Row>
        <Col lg={8}>
          <PageWrapper>
            <div className='ProductForm'>
              <h6>General</h6>
              <Row>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Title'
                    name='title'
                    value={title}
                    error={error.title}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <SelectField
                    label='Product Categories'
                    name='categories'
                    selected={categories}
                    optionsName={Object.keys(category)}
                    optionsValue={Object.keys(category)}
                    onChange={handleChange}
                    error={error.categories}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <SelectField
                    label='Sub Category'
                    name='subCategory'
                    selected={subCategory}
                    optionsName={category[categories] || []}
                    optionsValue={category[categories] || []}
                    onChange={handleChange}
                    error={error.categories}
                  />
                </Col>
                <Col lg={12} sm={12}>
                  <TextEditor
                    label='Description'
                    name='description'
                    value={description}
                    error={error.description}
                    onBlur={handleChange}
                  />
                </Col>
              </Row>
              <hr />
              <h6>Pricing</h6>
              <Row>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Regular price (QR)'
                    name='regularPrice'
                    value={regularPrice}
                    type='number'
                    error={error.regularPrice}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Sale price (QR)'
                    name='salePrice'
                    value={salePrice}
                    type='number'
                    error={error.salePrice}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Cost per Item (QR)'
                    name='costPerItem'
                    value={costPerItem}
                    type='number'
                    error={error.salePrice}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <hr />
              <h6>Inventory</h6>
              <Row>
                <Col lg={6} sm={12}>
                  <InputField
                    label='SKU (Stock Keeping Unit)'
                    name='sku'
                    value={sku}
                    type='number'
                    error={error.sku}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Quantity (Available)'
                    name='quantity'
                    value={quantity}
                    type='number'
                    error={error.quantity}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={12} sm={12}>
                  <CheckBox
                    label='Track quantity'
                    name='trackQuantity'
                    checked={trackQuantity}
                    onChange={handleChecked}
                  />
                  <CheckBox
                    label='Continue selling when out of stock'
                    name='continueSelling'
                    checked={continueSelling}
                    onChange={handleChecked}
                  />
                </Col>
              </Row>
              <hr />
              <h6>Shipping</h6>
              <Row>
                <Col lg={6} sm={12}>
                  <InputField
                    label='Weight (kg)'
                    name='weight'
                    value={weight}
                    type='number'
                    error={error.weight}
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <div className='InputGroup'>
                    <InputField
                      label='Length'
                      name='length'
                      value={length}
                      type='number'
                      placeholder='Length'
                      error={error.length}
                      onChange={handleChange}
                    />
                    <InputField
                      label='Width'
                      name='width'
                      value={width}
                      type='number'
                      placeholder='Width'
                      error={error.width}
                      onChange={handleChange}
                    />
                    <InputField
                      label='Height'
                      name='height'
                      value={height}
                      type='number'
                      placeholder='Height'
                      error={error.height}
                      onChange={handleChange}
                    />
                  </div>
                </Col>
              </Row>
              <hr />
              <h6>Variants</h6>
              <Row>
                <Col lg={12} sm={12}>
                  <CheckBox
                    label='This product has multiple options, like different sizes or colors'
                    name='isVariants'
                    checked={isVariants}
                    onChange={handleChecked}
                  />
                </Col>
              </Row>
              {isVariants && (
                <>
                  {options.map((item, i) => (
                    <Row key={item.optionName + i}>
                      <Col lg={4} sm={12}>
                        <SelectField
                          label='Option'
                          name='optionName'
                          selected={item.optionName}
                          optionsName={['Size', 'Color']}
                          optionsValue={['Size', 'Color']}
                          onChange={handleChangeOption}
                          onFocus={() => setFocusInput(i)}
                        />
                      </Col>
                      <Col lg={8} sm={12}>
                        <div className='InputGroup'>
                          <div className='VariantsInputGroup'>
                            <div className='Lable'>
                              <Label title='Variants' />
                              <span
                                className='RemoveBtn'
                                onClick={() => handleRemove(i)}
                              >
                                Remove
                              </span>
                            </div>
                            <InputTags
                              selectedTags={e => selectedTags(e, i)}
                              inputTags={item.tags}
                              onFocus={() => setFocusInput(i)}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  ))}

                  <Col lg={12} sm={12}>
                    <Label title='&nbsp;' />
                    <Button onClick={handleAddOption}>Add option</Button>
                  </Col>
                </>
              )}
              <hr />
              {isVariants && (
                <Table responsive>
                  <thead className='TableHead'>
                    <tr>
                      <th>Variant</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>SKU</th>
                    </tr>
                  </thead>
                  <tbody>
                    {variants.map((item, i) => (
                      <tr key={i}>
                        <td>{item.variant}</td>
                        <td>
                          <InputField
                            name='price'
                            value={item.price}
                            type='number'
                            error={error.price}
                            onChange={handleVariantChange}
                            onFocus={() => setFocusInput(i)}
                          />
                        </td>
                        <td>
                          <InputField
                            name='quantity'
                            value={item.quantity}
                            type='number'
                            error={error.quantity}
                            onChange={handleVariantChange}
                            onFocus={() => setFocusInput(i)}
                          />
                        </td>
                        <td>
                          <InputField
                            name='sku'
                            value={item.sku}
                            error={error.sku}
                            onChange={handleVariantChange}
                            onFocus={() => setFocusInput(i)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
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
            <hr />
            <InputField
              label='Product tags'
              name='productTags'
              value={productTags}
              placeholder='Mobile, Tab, Laptop'
              error={error.productTags}
              onChange={handleChange}
            />
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
