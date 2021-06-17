import React from 'react'
import { Container } from 'react-bootstrap'
import UserphotoUrl from '@assets/images/userphoto.png'
import './index.scss'

const Testimonial = () => {
  return (
    <div className='Testimonial'>
      <div className='Comment'>
        <h4>Efficient Collaborating</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque
          sed imperdiet nibh lectus feugiat nunc sem.
        </p>
      </div>
      <div className='UserInfo'>
        <img src={UserphotoUrl} />
        <h5>Jane Cooper</h5>
        <p>CEO at ABC Corporation</p>
      </div>
    </div>
  )
}

const Testimonials = () => {
  return (
    <div className='Testimonials'>
      <h1 className='Heading'>Our Clients Speak</h1>
      <p className='SubTitle'>
        We have been working with clients around the world
      </p>
      <Container>
        <div className='TestimonialGroup'>
          <Testimonial />
          <Testimonial />
          <Testimonial />
        </div>
      </Container>
    </div>
  )
}

export default Testimonials
