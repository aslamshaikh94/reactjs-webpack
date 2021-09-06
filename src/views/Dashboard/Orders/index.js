import React from 'react'
import { useStore } from '@store/'
import { Link, useRouteMatch } from 'react-router-dom'
import PageTitle from '@shared/PageTitle'
import PageWrapper from '@shared/PageWrapper'
import { InputField } from '@shared/FormFields'
import { Table } from 'react-bootstrap'

const Orders = () => {
  const {
    state: { loggedInUserData: { uid } = {} }
  } = useStore()

  const { url } = useRouteMatch()
  const handleChange = () => {}

  return (
    <>
      <PageTitle title='Orders'>
        {/* <Link to={`${url}/new`} className='btn btn-primary'>
          Add product
        </Link> */}
      </PageTitle>
      <PageWrapper>
        <div className='ProductsList'>
          <div className='FilterHead'>
            <InputField mb='None' onChange={handleChange} />
          </div>
          <Table responsive>
            <thead className='TableHead'>
              <tr>
                <th>Order </th>
                <th>Product</th>
                <th>Date </th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Fulfillment</th>
                <th>Items</th>
                <th>Delivery method </th>
                <th>Tags </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{1}</td>
                <td>
                  <img
                    src='https://firebasestorage.googleapis.com/v0/b/vivamomy-vendor.appspot.com/o/products%2FQpbG0PMo04ZJxMjMIDnwuBslrgj2%2F12.jpg?alt=media&token=71d1b5a9-967f-4518-ad97-2c3dc7c67908'
                    className='Thumbnail'
                  />{' '}
                  MUSTELA GENTLE CLEANSING
                </td>
                <td>12/04/2021</td>
                <td>Asif Shaikh</td>
                <td>200</td>
                <td>Paid</td>
                <td>Fulfilled</td>
                <td>1 Item</td>
                <td>Standard</td>
                <td></td>
              </tr>
              <tr>
                <td>{2}</td>
                <td>
                  <img
                    src='https://firebasestorage.googleapis.com/v0/b/vivamomy-vendor.appspot.com/o/products%2FQpbG0PMo04ZJxMjMIDnwuBslrgj2%2F12.jpg?alt=media&token=71d1b5a9-967f-4518-ad97-2c3dc7c67908'
                    className='Thumbnail'
                  />{' '}
                  MUSTELA GENTLE CLEANSING
                </td>
                <td>12/04/2021</td>
                <td>Asif Shaikh</td>
                <td>200</td>
                <td>Paid</td>
                <td>Fulfilled</td>
                <td>1 Item</td>
                <td>Standard</td>
                <td></td>
              </tr>
              <tr>
                <td>{3}</td>
                <td>
                  <img
                    src='https://firebasestorage.googleapis.com/v0/b/vivamomy-vendor.appspot.com/o/products%2FQpbG0PMo04ZJxMjMIDnwuBslrgj2%2F12.jpg?alt=media&token=71d1b5a9-967f-4518-ad97-2c3dc7c67908'
                    className='Thumbnail'
                  />{' '}
                  MUSTELA GENTLE CLEANSING
                </td>
                <td>12/04/2021</td>
                <td>Asif Shaikh</td>
                <td>200</td>
                <td>Paid</td>
                <td>Fulfilled</td>
                <td>1 Item</td>
                <td>Standard</td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </PageWrapper>
    </>
  )
}

export default Orders
