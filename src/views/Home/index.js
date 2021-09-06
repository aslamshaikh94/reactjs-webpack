import React, { useEffect, useState } from 'react'
import { callGetProductsApi } from '@api/product'
import Header from '@shared/Header'
import Product from '@shared/Product'
import { Container } from 'react-bootstrap'
import './index.scss'

const BannerImg =
  'https://cdn.shopify.com/s/files/1/0938/8938/files/hero_slide_1_1728x.jpg?v=1516999166'
const Home = () => {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    const data = await callGetProductsApi()
    setProducts(data)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <Header />
      <div className='Home'>
        <section className='Banner'>
          <img src={BannerImg} className='BannerImg' />
        </section>
        <section className='Products'>
          <Container>
            <div className='ProductsGroup'>
              {products.map(product => (
                <Product data={product} key={product.id} />
              ))}
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}

export default Home
