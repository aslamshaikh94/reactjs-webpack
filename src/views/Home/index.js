import React from 'react'
import Banner from './Banner'
import Categories from './Categories'
import Whyus from './Whyus'
import OurClients from './OurClients'
import Testimonials from './Testimonials'
import './index.scss'

const Home = () => {
  return (
    <>
      <div>
        <Banner />
        <section className='Section White'>
          <Categories />
          <Whyus />
        </section>
        <section className='Section Gray'>
          <OurClients />
          <Testimonials />
        </section>
      </div>
    </>
  )
}

export default Home
