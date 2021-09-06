import React from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS_ROUTE } from '@constants/routes'
import './index.scss'

const Product = props => {
  const { data } = props

  return (
    <div className='Product' key={data.id}>
      <Link to={`${PRODUCTS_ROUTE}/${data.id}`} className='ProductLink'>
        <div className='ProductImg'>
          <img src={data.productImage} />
        </div>
        <div className='Title'>{data.title}</div>
        <div className='Price'>
          <span className='Regular'>{data.regularPrice}</span>{' '}
          <span className='Sale'>{data.salePrice}</span>
        </div>
        <div className='Overlap'>
          <div className='ViewBtn'>View</div>
        </div>
      </Link>
    </div>
  )
}

export default Product
