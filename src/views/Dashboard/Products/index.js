import React, { useEffect, useState } from 'react'
import { useStore } from '@store/'
import { Link, useRouteMatch } from 'react-router-dom'
import PageTitle from '@shared/PageTitle'
import PageWrapper from '@shared/PageWrapper'
import { InputField } from '@shared/FormFields'
import { Table, DropdownButton, Dropdown } from 'react-bootstrap'
import { callGetUserProductsApi, callEditProductApi } from '@api/product'
import MoreIcon from '@assets/images/More.svg'

const Products = () => {
  const {
    state: { loggedInUserData: { uid } = {} }
  } = useStore()

  const [products, setProducts] = useState()
  const { url } = useRouteMatch()
  const handleChange = () => {}

  const getProducts = async () => {
    const data = await callGetUserProductsApi(uid)
    setProducts(data)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const handleStatus = async (id, status) => {
    await callEditProductApi(uid, id, { isPublish: status })
    const productList = products.map(item =>
      item.id === id ? { ...item, isPublish: status } : item
    )
    setProducts(productList)
  }

  return (
    <>
      <PageTitle title='Products'>
        <Link to={`${url}/new`} className='btn btn-primary'>
          Add product
        </Link>
      </PageTitle>
      <PageWrapper>
        <div className='ProductsList'>
          <div className='FilterHead'>
            <InputField mb='None' onChange={handleChange} />
          </div>
          <Table responsive>
            <thead className='TableHead'>
              <tr>
                <th>Sr. No</th>
                <th>Product</th>
                <th>Inventory</th>
                <th>Regular Price</th>
                <th>Sale Price</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <img src={item.productImage} className='Thumbnail' />{' '}
                        {item.title}
                      </td>
                      <td> in stock for 10 variants</td>
                      <td>QR {item.regularPrice}</td>
                      <td>QR {item.salePrice}</td>
                      <td>{item.quantity}</td>
                      <td>{item.isPublish ? 'Publish' : 'Draft'}</td>
                      <td>
                        <DropdownButton
                          drop={'left'}
                          variant='link'
                          className='ListingDropBtn'
                          title={<img src={MoreIcon} />}
                        >
                          <Dropdown.Item
                            eventKey='1'
                            onClick={() =>
                              handleStatus(item.id, !item.isPublish)
                            }
                          >
                            {!item.isPublish ? 'Publish' : 'Draft'}
                          </Dropdown.Item>
                          <Dropdown.Item
                            eventKey='2'
                            href={`${url}/edit/${item.id}`}
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item eventKey='3'>Delete</Dropdown.Item>
                        </DropdownButton>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </Table>
        </div>
      </PageWrapper>
    </>
  )
}

export default Products
