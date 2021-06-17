import React from 'react'
import ProductUrl from '@assets/images/product.png'
import './index.scss'

const Product = () => {
  return (
    <div className='Product'>
      <div className='Group'>
        <img src={ProductUrl} />
        <div className='Title'>Product Title</div>
      </div>
    </div>
  )
}

export default Product
