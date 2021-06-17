import React from 'react'
import Product from '@components/Product'
import { Container } from 'react-bootstrap'
import './index.scss'

const Categories = () => {
  return (
    <div className='Categories'>
      <Container>
        <h1 className='Heading'>Browse by the Categories</h1>
        <div className='row Products'>
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </Container>
    </div>
  )
}

export default Categories
